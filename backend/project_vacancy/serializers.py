from rest_framework import serializers, exceptions
from schema.models import Role, JobProfile,ProjectVacancy
from schema.utils import get_non_none_dict
from vacancy_role.serializers import VacancyRoleSerializer 
from datetime import datetime

class GetSerializer(serializers.Serializer):
    filter = serializers.ChoiceField(choices=['all','pending','approved','rejected'],required=False,default='all')
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
    name = serializers.CharField(required=True)
    department = serializers.CharField(required=True)
    start_date = serializers.DateField(required=True)
    description = serializers.CharField(required=True)
    end_date = serializers.CharField(required=False,allow_blank=True,allow_null=True)
    roles = serializers.ListField(required=False)
    user_id = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    status = serializers.CharField(write_only=True,default='pending')
    
    
    def validate(self,data):
        name= data.get('name')
        department = data.get('department')
        start_date = data.get('start_date')
        description = data.get('description')
        end_date = data.get('end_date')
        roles= data.get('roles')
        user_id = self.context['request'].user.id
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        status = data.get('status')
        
        #check if department is not in available roles
        
        if Role.objects.filter(company_id_id=company_id,department=department).exists() is False:
            raise exceptions.ValidationError('Department does not exist')
        
        if not end_date in [None,""]:
            #validate end date if it's a valid date
            try:
                datetime.strptime(end_date, '%Y-%m-%d')
            except:
                raise exceptions.ValidationError('End date is not a valid date')
              
        if roles is not None:
            if len(roles) == 0:
                raise exceptions.ValidationError('Roles should not be empty')
            roles_data = []
            for role in roles:
                #get non null fields :
                role_fields= get_non_none_dict(
                    job_profile_id = role.get('job_profile_id'),
                    start_date=role.get('start_date'),
                    description=role.get('description'),
                    end_date=role.get('end_date'),
                    hours=role.get('hours'),
                    salary=role.get('salary'),
                    skills=role.get('skills')
                )
                serializer = VacancyRoleSerializer(data=role_fields)
                serializer.is_valid(raise_exception=True)
                roles_data.append(dict(serializer.validated_data))
        
        return get_non_none_dict(
            name = name,
            department=department,
            start_date=start_date,
            description=description,
            end_date=end_date,
            user_id=user_id,
            system_role=system_role,
            status=status,
            company_id=company_id,
            roles=roles_data
        )

class PutSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    department = serializers.CharField(required=False,allow_blank=True,allow_null=True)
    start_date = serializers.CharField(required=False,allow_blank=True,allow_null=True)
    description = serializers.CharField(required=False,allow_blank=True,allow_null=True)
    end_date = serializers.CharField(required=False,allow_blank=True,allow_null=True)
    status = serializers.CharField(required=False,allow_blank=True)
    system_role = serializers.CharField(write_only=True,required=False)
    user_id = serializers.IntegerField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    
    def validate(self,data):
        id = data.get('id')
        name = data.get('name')
        start_date = data.get('start_date')
        description = data.get('description')
        end_date = data.get('end_date')
        status = data.get('status')
        department = data.get('department')
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        user_id = self.context['request'].user.id
        #if role is manager, he only can update his own job
        if system_role == "manager":
            if ProjectVacancy.objects.filter(id=id,user_id=user_id).exists() is False:
                raise exceptions.ValidationError('Project does not exist')
            status = None
        elif system_role =="admin":
            if ProjectVacancy.objects.filter(id=id).exists() is False:
                raise exceptions.ValidationError('Project does not exist')
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
        return get_non_none_dict(
            id=id,
            department=department,
            name=name,
            start_date=start_date,
            description=description,
            end_date=end_date,
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
            if ProjectVacancy.objects.filter(id=id,user_id = user_id).exists() is False:
                raise exceptions.ValidationError('Job does not exist')
        elif system_role=="admin":
            if ProjectVacancy.objects.filter(id=id,company_id=company_id).exists() is False:
                raise exceptions.ValidationError('Job does not exist')
        return {
            'id':id,
            'system_role':system_role,
            'user_id': user_id,
            'company_id':company_id
            }