from rest_framework import serializers, exceptions
from schema.models import GripUser,SkillProficiency,Endorsement
from schema.utils import getNodeByID


class GetSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=True)
    company_id = serializers.IntegerField(write_only=True,required=False)
    def validate(self,data):
        user_id = data.get('user_id')
        company_id = self.context['request'].user.company_id.id
        
        #check if user exists
        if GripUser.objects.filter(id=user_id,company_id_id=company_id).exists() is False:
            raise exceptions.ValidationError('User does not exist')
        #get gripfile with this id
        return {
            'user_id':user_id,
            'company_id':company_id
            }
    
class PostSerializer(serializers.Serializer):
 
    skill_id = serializers.CharField(required=True)
    user_id = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    
    
    def validate(self,data):
        skill_id = data.get('skill_id')
        user_id = self.context['request'].user.id
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        #check if skill proficiency exists
        if SkillProficiency.objects.filter(id=skill_id,company_id_id=company_id).exists() is False:
            raise exceptions.ValidationError('Skill does not exist')
        #get gripfile with this id
        return {
            "skill_id": skill_id,
            "user_id": user_id,
            "company_id": company_id,
            "system_role": system_role
            }

class DeleteSerializer(serializers.Serializer):
    skill_id = serializers.IntegerField(required=False)
    id = serializers.IntegerField(required=False)
    system_role = serializers.CharField(write_only=True,required=False)
    user_id = serializers.IntegerField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    def validate(self,data):
        id = data.get('id')
        skill_id = data.get('skill_id')
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        user_id = self.context['request'].user.id
        if skill_id is None and id is None:
            raise exceptions.ValidationError('ID or Skill_id are required')
        
        if skill_id is not None and id is not None:
            raise exceptions.ValidationError('ID and Skill_id cannot be provided at the same time')
        #check if id exists 
        if skill_id is not None:
            if not SkillProficiency.objects.filter(id=skill_id,company_id_id=company_id).exists():
                raise exceptions.ValidationError('Skill does not exist')
            
        if id is not None:
            if not Endorsement.objects.filter(id=id,company_id_id=company_id,endorser_id=user_id).exists():
                raise exceptions.ValidationError('Skill does not exist')
        #get gripfile with this id
        return {
            'id':id,
            "skill_id": skill_id,
            'system_role':system_role,
            'user_id': user_id,
            'company_id':company_id
            }