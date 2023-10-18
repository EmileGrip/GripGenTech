from rest_framework import serializers, exceptions
from schema.models import  JobProfile,VacancyRole
from schema.utils import get_non_none_dict
from vacancy_skill.serializers import VacancySkillSerializer
from datetime import datetime
        
class VacancyRoleSerializer(serializers.Serializer):
    start_date = serializers.DateField(required=True)
    job_profile_id = serializers.IntegerField(required=True)
    description = serializers.CharField(required=False,allow_blank=True)
    end_date = serializers.DateField(required=False,allow_null=True)
    hours = serializers.CharField(required=False,allow_blank=True)
    salary = serializers.CharField(required=False,allow_blank=True)
    skills = serializers.ListField(required=False,default=[])
    
    
    def validate(self,data):
        start_date = data.get('start_date')
        job_profile_id = data.get('job_profile_id')
        description = data.get('description')
        end_date = data.get('end_date')
        hours = data.get('hours')
        salary = data.get('salary')
        skills = data.get('skills')
        #check if job_profile_id is valid
        if JobProfile.objects.filter(id=job_profile_id).exists() is False:
            raise exceptions.ValidationError('Job profile does not exist')
        
        skills_list = []
        for skill in skills:
            #define skill serializer
            serializer = VacancySkillSerializer(data=skill)
            serializer.is_valid(raise_exception=True)
            skills_list.append(dict(serializer.validated_data))
            
        return get_non_none_dict(
            start_date=start_date,
            job_profile_id=job_profile_id,
            description=description,
            end_date=end_date,
            hours=hours,
            salary=salary,
            skills=skills_list
        )
                                          
class GetSerializer(serializers.Serializer):
    vacancy_type = serializers.ChoiceField(choices=['job','project'],required=True)
    vacancy_id = serializers.IntegerField(required=True)
    company = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)

    def validate(self,data):
        vacancy_type = data.get('vacancy_type')
        vacancy_id = data.get('vacancy_id')
        company = self.context['request'].user.company_id.id
        system_role = self.context['request'].user.system_role
        #get gripfile with this id
        return {
            'vacancy_type':vacancy_type,
            "vacancy_id":vacancy_id,
            'company':company,
            'system_role':system_role
            }
    
class PostSerializer(serializers.Serializer):
    vacancy_id = serializers.IntegerField(required=True)
    vacancy_type = serializers.ChoiceField(choices=['job','project'],required=True)
    start_date = serializers.DateField(required=True)
    job_profile_id = serializers.IntegerField(required=True)
    description = serializers.CharField(required=False,allow_blank=True,allow_null=True)
    end_date = serializers.CharField(required=False,allow_null=True)
    hours = serializers.CharField(required=False,allow_blank=True)
    salary = serializers.CharField(required=False,allow_blank=True)
    skills = serializers.ListField(required=False,default=[])
    user_id = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    
    
    def validate(self,data):
        vacancy_id = data.get('vacancy_id')
        vacancy_type = data.get('vacancy_type')
        start_date = data.get('start_date')
        job_profile_id = data.get('job_profile_id')
        description = data.get('description')
        end_date = data.get('end_date')
        hours = data.get('hours')
        salary = data.get('salary')
        skills = data.get('skills')
        user_id = self.context['request'].user.id
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        if not end_date in [None,""]:
            #validate end date if it's a valid date
            try:
                datetime.strptime(end_date, '%Y-%m-%d')
            except:
                raise exceptions.ValidationError('End date is not a valid date')
              
        #call vacancy roll serializer
        serializer = VacancyRoleSerializer(data={
            "job_profile_id":job_profile_id,
            "start_date":start_date,
            "end_date":end_date,
            "hours":hours,
            "salary":salary,
            "skills":skills,
            "description":description
        })
        serializer.is_valid(raise_exception=True)
        role_data = dict(serializer.validated_data)
        return get_non_none_dict(
            start_date=role_data["start_date"],
            job_profile_id=role_data["job_profile_id"],
            description=role_data["description"],
            end_date=role_data["end_date"],
            hours=role_data["hours"],
            salary=role_data["salary"],
            user_id=user_id,
            system_role=system_role,
            company_id=company_id,
            vacancy_id=vacancy_id,
            vacancy_type=vacancy_type
        )

class PutSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    start_date = serializers.CharField(required=False,allow_null=True)
    job_profile_id = serializers.IntegerField(required=False)
    description = serializers.CharField(required=False,allow_null=True)
    end_date = serializers.CharField(required=False,allow_null=True)
    hours = serializers.CharField(required=False)
    salary = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    
    def validate(self,data):
        id = data.get('id')
        start_date = data.get('start_date')
        job_profile_id = data.get('job_profile_id')
        description = data.get('description')
        end_date = data.get('end_date')
        hours = data.get('hours')
        salary = data.get('salary')        
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        user_id = self.context['request'].user.id
        #if role is manager, he only can update his own job
        role = VacancyRole.objects.filter(id=id)
        if role.exists() is False:
            raise exceptions.ValidationError('Vacancy role does not exist')
        role = role.first()
        if system_role == "manager":
            if role.vacancy.user.id  != user_id:
                raise exceptions.ValidationError('You dont have the permissions to access this operation')
        if not end_date in [None,""]:
            #validate end date if it's a valid date
            try:
                datetime.strptime(end_date, '%Y-%m-%d')
            except:
                raise exceptions.ValidationError('End date is not a valid date')
            
        if not start_date in [None,""]:
            #validate end date if it's a valid date
            try:
                datetime.strptime(start_date, '%Y-%m-%d')
            except:
                raise exceptions.ValidationError('Start date is not a valid date')
        #check if 
        return get_non_none_dict(
            id=id,
            system_role=system_role,
            company_id=company_id,
            start_date=start_date,
            job_profile_id=job_profile_id,
            description=description,
            end_date=end_date,
            hours=hours,
            salary=salary,
            user_id=user_id
        )

class DeleteSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    system_role = serializers.CharField(write_only=True,required=False)
    user_id = serializers.IntegerField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    def validate(self,data):
        id = data.get('id')
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        user_id = self.context['request'].user.id
        #check if id exists 
        role = VacancyRole.objects.filter(id=id)
        
        if role.exists() is False:
            raise exceptions.ValidationError('Vacancy role does not exist')
        if system_role == "manager":
            if role.first().vacancy.user.id != user_id:
                raise exceptions.ValidationError('You dont have the permissions to access this operation')
        if len(role.vacancy.roles) <=1 : 
            raise exceptions.ValidationError('You cannot delete this vacancy role, there must be at least one role')
        return {
            'id':id,
            'system_role':system_role,
            'user_id': user_id,
            'company_id':company_id
            }