from rest_framework import serializers, exceptions
from schema.models import JobProfile,SkillRequirement,Skill,Company
from datetime import datetime
from django.forms.models import model_to_dict
from neomodel import db

class SkillProfileSerializer(serializers.Serializer):
    
    #define the fields related to the model Experience
    id = serializers.IntegerField(required=False)
    job_profile_id = serializers.IntegerField(required=False)
    skill_id = serializers.CharField(required=False,max_length=10)
    level = serializers.IntegerField(required=False)

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

    def validate_get(self,data):
        #get company_id from request object
        job_profile_id = data.get('job_profile_id')
        #check if two parameters are null
        if job_profile_id is None:
            raise exceptions.ValidationError("Job profile id is required")
        #check if job_profile_id is valid
        if job_profile_id is not None:
            if str(job_profile_id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid job_profile id')
            job_profile = JobProfile.objects.filter(id=job_profile_id)
            #check if job_profile_id is valid
            if len(job_profile) == 0:
                raise exceptions.ValidationError('Job profile does not exist')
        job_profile = job_profile[0]
        #check permissions
        current_user = self.context['request'].user
        #check if manager has permission to view this job profile
        if job_profile.company_id != current_user.company_id :
            raise exceptions.ValidationError('You are not authorized to view this job profile')
        
        #get all skill requirements for this job profile
        skill_requirements = SkillRequirement.objects.filter(job_profile_id=job_profile_id).values()
       
        self.response = {
            "success":True,
            "message":"Job profile data fetched successfully",
            "payload": skill_requirements
        }
        return {
            "job_profile_id":job_profile_id,
        }  
    
    def validate_post(self,data):

        #get fields from request object
        level = data.get('level')
        skill_id = data.get('skill_id')
        job_profile_id = data.get('job_profile_id')
        company_id = Company.objects.get(id=self.context['request'].user.company_id.id)
        #check if two parameters are null
        if job_profile_id is None:
            raise exceptions.ValidationError("Job profile id is required")
        #check if level is null
        if level is None:
            raise exceptions.ValidationError("Level is required")
        #check if skill_id is null
        if skill_id is None:
            raise exceptions.ValidationError("Skill id is required")
        if str(level).isnumeric() is False:
            raise exceptions.ValidationError('Invalid level, level shoud be numeric value from 1 to 5')
        
        if str(skill_id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid skill id, skill id should be integer')
        #check if job_profile_id is valid
        if job_profile_id is not None:
            if str(job_profile_id).isnumeric() is False:
                raise exceptions.ValidationError('Invalid job_profile id')
            job_profile = JobProfile.objects.filter(id=job_profile_id)
            #check if job_profile_id is valid
            if len(job_profile) == 0:
                raise exceptions.ValidationError('Job profile does not exist')
        job_profile = job_profile[0]
        #check permissions
        current_user = self.context['request'].user
        #check if manager has permission to view this job profile
        if job_profile.company_id != current_user.company_id :
            raise exceptions.ValidationError('You are not authorized to view this job profile')
        #check if skill_id is duplicated for the samse job profile
        if SkillRequirement.objects.filter(job_profile_id=job_profile_id,skill_id=skill_id).exists() is True:
            raise exceptions.ValidationError('Skill id already exists for this job profile')
        #get skill from database
        skill, _ = db.cypher_query(f'MATCH (s:Skill) WHERE ID(s) = {skill_id} RETURN s', None, resolve_objects=True)
        skill= skill[0]        
        if len (skill) == 0:
            raise exceptions.ValidationError('Skill with given id does not exist')
        else:
            skill = skill[0]
        #create skill requirement
        skill_requirement = SkillRequirement.objects.create(
            job_profile_id=job_profile,
            title=skill.preferredLabel,
            skill_id=skill_id,
            level=level,
            company_id=company_id,
            description=skill.description,
        )
        self.response = {
            "success":True,
            "message":"Skill requirement created successfully",
            "payload": model_to_dict(skill_requirement)
        }
        return {
            "job_profile_id":job_profile_id,
            "skill_id":skill_id,
            "level":level
        }

    def validate_put(self,data):
        id = data.get('id')
        level = data.get('level')
        #check if experience_id is valid
        if id is None:
            raise exceptions.ValidationError('SkillRequirement id is required')
        if str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid SkillRequirement id')
        if SkillRequirement.objects.filter(id=id).exists() is False:
            raise exceptions.ValidationError('SkillRequirement does not exist')
        
        #get SkillRequirement instance
        skill_requirement = SkillRequirement.objects.get(id=id)

        if skill_requirement.company_id.id != self.context['request'].user.company_id.id:
            raise exceptions.ValidationError('You do not have permission to update this skill requirement')

        #check level 
        if level is None:
            raise exceptions.ValidationError('Level is required')
        if str(level).isnumeric() is False:
            raise exceptions.ValidationError('Invalid level, level shoud be numeric value from 1 to 4')
        if int(level) < 1 or int(level) > 4:
            raise exceptions.ValidationError('Invalid level, level shoud be numeric value from 1 to 4')

        skill_requirement.level = level
        skill_requirement.save()
        self.response = {
            "success":True,
            "message":"Skill profile updated successfully",
            "payload": model_to_dict(skill_requirement)
        }
        return {
            "id":id
        }

    def validate_delete(self,data):
        #get experience_id from data
        id = data.get('id')
        #check if experience_id is valid
        if id is None:
            raise exceptions.ValidationError('SkillRequirement id is required')
        if str(id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid SkillRequirement id')
        if SkillRequirement.objects.filter(id=id).exists() is False:
            raise exceptions.ValidationError('SkillRequirement does not exist')
        
        #get SkillRequirement instance
        skill_requirement = SkillRequirement.objects.get(id=id)
        
        # get user ID from request object
        current_user = self.context['request'].user
        #check if manager has permission to delete this JobProfile
        if skill_requirement.job_profile_id.company_id != current_user.company_id :
            raise exceptions.ValidationError('You are not authorized to delete job profile')
  
        #delete job profile
        skill_requirement.delete()
        self.response = {
            "success":True,
            "message":"Skill profile deleted successfully",
        }
        return {"id":id}