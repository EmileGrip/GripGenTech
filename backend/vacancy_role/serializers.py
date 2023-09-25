from rest_framework import serializers, exceptions
from schema.models import  JobProfile,VacancyRole
from job_vacancy.lib import get_non_none_dict

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
    description = serializers.CharField(required=True)
    end_date = serializers.DateField(required=False)
    hours = serializers.CharField(required=False)
    salary = serializers.IntegerField(required=False)
    skills = serializers.ListField(required=False)
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
        user_id = self.context['request'].user.id
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        #check if job_profile_id is valid
        if JobProfile.objects.filter(id=job_profile_id,company_id_id=company_id).exists() is False:
            raise exceptions.ValidationError('Job profile does not exist')
        
        return get_non_none_dict(
            start_date=start_date,
            job_profile_id=job_profile_id,
            description=description,
            end_date=end_date,
            hours=hours,
            salary=salary,
            user_id=user_id,
            system_role=system_role,
            company_id=company_id,
            vacancy_id=vacancy_id,
            vacancy_type=vacancy_type
        )

class PutSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    start_date = serializers.DateField(required=False)
    job_profile_id = serializers.IntegerField(required=False)
    description = serializers.CharField(required=False)
    end_date = serializers.DateField(required=False)
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