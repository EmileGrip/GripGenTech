from rest_framework import serializers, exceptions
from schema.models import SkillWish,Skill,GripUser
from django.forms.models import model_to_dict
from neomodel import db

class GetSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=False)
    def get_response(self):
        return self.response
    def validate(self,data):
        user_id= data.get('user_id',self.context['request'].user.id)
        #get user 
        user = GripUser.objects.filter(id=user_id)
        #check if the user exists
        if user.exists() is False:
            raise exceptions.ValidationError('User does not exist')
        user = user.first()
        #check if user in the same company
        if user.company_id.id != self.context['request'].user.company_id.id:
            raise exceptions.ValidationError('You do not have permission to access this data')
            
        skills = SkillWish.objects.filter(user_id=user).values()

        #get gripfile with this id
       
        self.response = {
            "success":True,
            "message":"Skill Wish data fetched successfully",
            "payload":skills
            
        }
        return {}
    
class PostSerializer(serializers.Serializer):
    skill_id = serializers.CharField(required=True)

    def validate(self,data):
        skill_id = data.get('skill_id')
        #check if skill_id is valid
        if str(skill_id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid Skill id')
        
        #check if skill_id exists
        if SkillWish.objects.filter(skill_id=skill_id).exists():
            raise exceptions.ValidationError('Skill with given id already exists')
        #get skill from database
        skill, _ = db.cypher_query(f'MATCH (s:Skill) WHERE ID(s) = {skill_id} RETURN s', None, resolve_objects=True)
        skill = skill[0]
        if len (skill) == 0:
            raise exceptions.ValidationError('Skill with given id does not exist')
        else:
            skill = skill[0]
        new_wish = SkillWish.objects.create(
            user_id= self.context['request'].user,
            skill_id=skill_id,
            title=skill.preferredLabel,
            description=skill.description,
            company_id = self.context['request'].user.company_id
        )
        
        # save response
        self.response = {
            "success":True,
            "message":"Skill Wish created successfully",
            "payload":model_to_dict(new_wish)
        }
        
        return {"skill_id":skill_id}
    def get_response(self):
        return self.response
    
class DeleteSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    def get_response(self):
        return self.response
    
    def validate(self,data):
        id = data.get('id')
        #get skill wish with this id
        wish = SkillWish.objects.filter(id=id)
        if not wish.exists():
            raise exceptions.ValidationError('Skill Wish with this id does not exist')
        
        wish = wish.first()
        user_id = self.context['request'].user.id
        if wish.user_id.id != user_id:
            raise exceptions.ValidationError('You do not have access to this skill wish')
        
        wish.delete()
        self.response = {
            "success":True,
            "message":"Skill Wish deleted successfully",
       
        }
        return {'id':id}