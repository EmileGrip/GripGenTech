from rest_framework import serializers, exceptions
from schema.models import Role, JobProfile,JobVacancy
from schema.utils import get_non_none_dict
from vacancy_role.serializers import VacancyRoleSerializer

class GetSerializer(serializers.Serializer):
    filter = serializers.ChoiceField(choices=['all','pending','approved','declined'],required=False,default='all')
    company_id = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)

    def validate(self,data):
        filter = data.get('filter')
        company_id = self.context['request'].user.company_id.id
        system_role = self.context['request'].user.system_role
        #get gripfile with this id
        return {
            'filter':filter,
            'company_id':company_id,
            'system_role':system_role
            }
    
class PostSerializer(serializers.Serializer):
    department = serializers.CharField(required=False,allow_blank=True,max_length=50)
    start_date = serializers.DateField(required=True)
    job_profile_id = serializers.IntegerField(required=True)
    description = serializers.CharField(required=False,allow_blank=True,max_length=700)
    end_date = serializers.CharField(required=False,allow_blank=True,allow_null=True)
    hours = serializers.CharField(required=False,allow_blank=True,max_length=50)
    salary = serializers.CharField(required=False,allow_blank=True,max_length=50)
    skills = serializers.ListField(required=False)
    user_id = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    status = serializers.CharField(write_only=True,default='pending')
    
    
    def validate(self,data):
        department = data.get('department')
        start_date = data.get('start_date')
        job_profile_id = data.get('job_profile_id')
        description = data.get('description')
        end_date = data.get('end_date')
        hours = data.get('hours')
        salary = data.get('salary')
        skills= data.get('skills')
        user_id = self.context['request'].user.id
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        status = data.get('status')
        #get non null fields from data for vacancy role
        vacancy_role_data = get_non_none_dict(
            department=department,
            start_date=start_date,
            job_profile_id=job_profile_id,
            description=description,
            end_date=end_date,
            hours=hours,
            salary=salary,
            skills=skills
        )
        #define vacancy role serializer
        serializer = VacancyRoleSerializer(data=vacancy_role_data)
        serializer.is_valid(raise_exception=True)
        role_data = dict(serializer.validated_data)
     
        return get_non_none_dict(
            department=department,
            start_date=role_data["start_date"],
            job_profile_id=role_data["job_profile_id"],
            description=role_data.get("description"),
            end_date=role_data.get("end_date"),
            hours=role_data.get("hours"),
            salary=role_data.get("salary"),
            user_id=user_id,
            system_role=system_role,
            status=status,
            company_id=company_id,
            skills=role_data.get("skills")
        )

class PutSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    department = serializers.CharField(required=False,max_length=50)
    status = serializers.CharField(required=False)
    system_role = serializers.CharField(write_only=True,required=False)
    user_id = serializers.IntegerField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    
    def validate(self,data):
        id = data.get('id')
        department = data.get('department')
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        user_id = self.context['request'].user.id
        status = data.get('status')
        #if role is manager, he only can update his own job
        if system_role == "manager":
            if JobVacancy.objects.filter(id=id,user_id=user_id).exists() is False:
                raise exceptions.ValidationError('Job does not exist')
        elif system_role =="admin":
            if JobVacancy.objects.filter(id=id).exists() is False:
                raise exceptions.ValidationError('Job does not exist')
        else:
            status = None
        return get_non_none_dict(
            id=id,
            department=department,
            status=status,
            system_role=system_role,
            company_id=company_id
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
        if system_role == "manager":
            if JobVacancy.objects.filter(id=id,user_id = user_id).exists() is False:
                raise exceptions.ValidationError('Job does not exist')
        elif system_role=="admin":
            if JobVacancy.objects.filter(id=id,company_id=company_id).exists() is False:
                raise exceptions.ValidationError('Job does not exist')
        return {
            'id':id,
            'system_role':system_role,
            'user_id': user_id,
            'company_id':company_id
            }