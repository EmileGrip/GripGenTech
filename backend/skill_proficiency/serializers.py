from rest_framework import serializers, exceptions
from schema.models import JobProfile,SkillProficiency,GripUser,Skill,Company,Person,Role,SkillRequirement
from datetime import datetime
from django.forms.models import model_to_dict
from neomodel import db
class SkillProficiencySerializer(serializers.Serializer):
    
    #define the fields related to the model Experience
    id = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField(required=False)
    skill_id = serializers.CharField(required=False,max_length=10)
    level = serializers.IntegerField(required=False)
    skills = serializers.ListField(required=False)

    def __get_non_null_fields(self,**kwargs):
        return {k: v for k, v in kwargs.items() if v not in [None,""]}
    
    def get_response(self):
        return self.response

    def validate(self, data):
        if self.context['method'] == 'POST':
            return self.validate_post(data)
        if self.context['method'] == 'GET':
            return self.validate_get(data)
        if self.context['method'] == 'DELETE':
            return self.validate_delete(data)
        if self.context['method'] == 'PUT':
            return self.validate_put(data)
        if self.context['method'] == 'PATCH':
            return self.validate_patch(data)

    def validate_get(self,data):
        #get company_id from request object
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
        #get all skill proficiency for this job profile
        skill_profs = SkillProficiency.objects.filter(user_id=user_id).all()
        skill_proficiencys = []
        for skill in skill_profs:
            skill_prof = model_to_dict(skill)
            skill_prof['verified']= skill.endorsements.exists()
            skill_prof['required_level']=0
            skill_prof['status']=skill.level
            skill_proficiencys.append(skill_prof)
        #check if the user is related to role
        if Role.objects.filter(user_id_id=user_id).exists() is True:
            role = Role.objects.get(user_id_id=user_id)
            if role.job_profile_id is not None:
                skill_requirement = SkillRequirement.objects.filter(job_profile_id=role.job_profile_id)
                for skill_requirement in skill_requirement:
                    for skill in skill_proficiencys:
                        if skill_requirement.skill_id == skill['skill_id']:
                            skill['required_level'] = skill_requirement.level
                            skill['status'] -= skill['required_level']
                            break

        #set response
        self.response = {
            "success":True,
            "message":"Job profile data fetched successfully",
            "payload": skill_proficiencys
        }
        return {
            "user_id":user_id,
        }  
    
    def validate_put(self,data):
        id = data.get('id')
        level = data.get('level')
        #check if experience_id is valid
        if id is None:
            raise exceptions.ValidationError('Skill Proficiency id is required')
        if str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid Skill Proficiency id')
        if SkillProficiency.objects.filter(id=id).exists() is False:
            raise exceptions.ValidationError('Skill Proficiency does not exist')
        
        #get SkillRequirement instance
        skill_Proficiency = SkillProficiency.objects.get(id=id)

        if skill_Proficiency.user_id.id != self.context['request'].user.id:
            raise exceptions.ValidationError('You are not authorized to edit this skill proficiency')
        
        #check level 
        if level is None:
            raise exceptions.ValidationError('Level is required')
        if str(level).isnumeric() is False:
            raise exceptions.ValidationError('Invalid level, level shoud be numeric value from 1 to 4')
        if int(level) < 1 or int(level) > 4:
            raise exceptions.ValidationError('Invalid level, level shoud be numeric value from 1 to 4')
        
        skill_Proficiency.level = level
        skill_Proficiency.save()
        self.response = {
            "success":True,
            "message":"Skill Proficiency updated successfully",
            "payload": model_to_dict(skill_Proficiency)
        }
        return {
            "id":id
        }
    
    def validate_patch(self,data):
        skills = data.get('skills')
        #check if skills is valid
        if skills is None:
            raise exceptions.ValidationError('Skills is required')
        if len(skills) == 0:
            raise exceptions.ValidationError('Skills is required')
        
        #iterate through skills and check for it's keys 
        for skill in skills : 
            self.validate_post(skill)
        self.response = {
            "success":True,
            "message":"Skills created successfully"
        }  
        return {
            "skills":skills
        }
        
            
    def validate_post(self,data):

        #get fields from request object
        level = data.get('level')
        skill_id = data.get('skill_id')
        user_id = self.context['request'].user.id
        comapny_id =Company.objects.get(id=self.context['request'].user.company_id.id)
        #check if level is null
        if level is None:
            raise exceptions.ValidationError("Level is required")
        #check if skill_id is null
        if skill_id is None:
            raise exceptions.ValidationError("Skill id is required")
        
        if str(level).isnumeric() is False:
            raise exceptions.ValidationError('Invalid level, level shoud be numeric value from 1 to 5')
        
        
        user = GripUser.objects.get(id=user_id)

        #check if skill_id exists for the same user
        if SkillProficiency.objects.filter(skill_id=skill_id,user_id=user).exists():
            raise exceptions.ValidationError('Skill proficiency already exists for this user')
        #get skill from database
        skill, _ = db.cypher_query(f'MATCH (s:Skill) WHERE ID(s) = {skill_id} RETURN s', None, resolve_objects=True)
        skill=skill[0]
        if len (skill) == 0:
            raise exceptions.ValidationError('Skill with given id does not exist')
        else:
            skill = skill[0]
        #create skill proficiency 
        skill_proficiency = SkillProficiency.objects.create(
            user_id=user,
            title=skill.preferredLabel,
            skill_id=skill_id,
            level=level,
            company_id= comapny_id,
            description=skill.description
        )
        #get person related to user
        person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {self.context["request"].user.person_id} RETURN s', None, resolve_objects=True)
        #connect person to skill proficiency
        person = person[0][0]
        print(person)
        person.HasSkill.connect(skill)
        self.response = {
            "success":True,
            "message":"Skill proficiency created successfully",
            "payload": model_to_dict(skill_proficiency)
        }
        return {
            "user_id":user_id,
            "skill_id":skill_id,
            "level":level
        }

    def validate_delete(self,data):
        #get experience_id from data
        id = data.get('id')
        #check if experience_id is valid
        if id is None:
            raise exceptions.ValidationError('SkillRequirement id is required')
        if str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid SkillRequirement id')
        if SkillProficiency.objects.filter(id=id).exists() is False:
            raise exceptions.ValidationError('SkillRequirement does not exist')
        
        #get SkillProficiency instance
        skill_proficiency  = SkillProficiency.objects.get(id=id)
        
        # get user ID from request object
        current_user = self.context['request'].user
        #check if the user is authorized to delete this skill proficiency
        if current_user.id != skill_proficiency.user_id.id:
            raise exceptions.ValidationError('You are not authorized to delete this skill proficiency')
        
        skill, _ = db.cypher_query(f'MATCH (s:Skill) WHERE ID(s) = {skill_proficiency.skill_id} RETURN s', None, resolve_objects=True)
        skill =skill[0][0]
        person,_ = db.cypher_query(f'MATCH (s:Person) WHERE ID(s) = {self.context["request"].user.person_id} RETURN s', None, resolve_objects=True)
        person = person[0][0]
        person.HasSkill.disconnect(skill)
        #delete job profile
        skill_proficiency.delete()

        self.response = {
            "success":True,
            "message":"skill proficiency deleted successfully",
        }
        return {"id":id}