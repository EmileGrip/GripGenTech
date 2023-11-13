from rest_framework import serializers, exceptions
from schema.models import JobVacancy,VacancySkill,VacancyRole
from vacancy_skill.lib import getNodeByID

class VacancySkillSerializer(serializers.Serializer):
    skill_ref = serializers.CharField(required=True,allow_blank=False,max_length=10)
    level = serializers.ChoiceField(choices=[0,1,2,3,4],required=True)
    
    def validate(self,data):
        skill_ref = data.get('skill_ref')
        level = data.get('level')
        node = getNodeByID("Skill",skill_ref)
        if node is None:
            raise exceptions.ValidationError('Skill does not exist')
        return {
            'skill_ref':skill_ref,
            'level':level
        }
class GetSerializer(serializers.Serializer):
    vacancy_role_id = serializers.IntegerField(required=True)
    company_id = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)

    def validate(self,data):
        vacancy_role_id = data.get('vacancy_role_id')
        company_id = self.context['request'].user.company_id.id
        system_role = self.context['request'].user.system_role
        user_id = self.context['request'].user.id
        role = VacancyRole.objects.filter(id=vacancy_role_id,company_id=company_id)
        if role.exists() is False:
            raise exceptions.ValidationError('Vacancy role does not exist')
        if system_role == "manager":
            if role.first().vacancy.user.id != user_id:
                raise exceptions.ValidationError('You dont have the permissions to access this data')
        if system_role == "employee":
            if role.first().vacancy.status in ["pending","declined"]:
                raise exceptions.ValidationError('You dont have the permissions to access this data')
        
        #get gripfile with this id
        return {
            'vacancy_role_id':vacancy_role_id,
            'company_id':company_id,
            'system_role':system_role
            }
    
class PostSerializer(serializers.Serializer):
 
    vacancy_role_id = serializers.IntegerField(required=True)
    skill_ref = serializers.CharField(required=True,max_length=10)
    level = serializers.ChoiceField(choices=[0,1,2,3,4],required=True)
    user_id = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    
    
    def validate(self,data):
        vacancy_role_id = data.get('vacancy_role_id')
        skill_ref = data.get('skill_ref')
        user_id = self.context['request'].user.id
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        level = data.get('level')
        #check if department is not in available roles
        
        role = VacancyRole.objects.filter(id=vacancy_role_id,company_id=company_id)
        if role.exists() is False:
            raise exceptions.ValidationError('Vacancy role does not exist')
        if role.first().vacancy.user.id != user_id:
            raise exceptions.ValidationError('You dont have the permissions to access this data')

        #define skill serializer
        serializer = VacancySkillSerializer(data={
            "skill_ref":skill_ref,
            "level":level
        })
        serializer.is_valid(raise_exception=True)
        skill_ref = serializer.validated_data['skill_ref']
        level = serializer.validated_data['level']
        #get gripfile with this id
        return {
            "vacancy_role_id":vacancy_role_id,
            "skill_ref": skill_ref,
            "user_id": user_id,
            "company_id": company_id,
            "system_role": system_role,
            "level" : level
        }

    
class PutSerializer(serializers.Serializer):
 
    id = serializers.IntegerField(required=True)
    level = serializers.ChoiceField(choices=[0,1,2,3,4],required=True)
    user_id = serializers.IntegerField(write_only=True,required=False)
    system_role = serializers.CharField(write_only=True,required=False)
    company_id = serializers.IntegerField(write_only=True,required=False)
    
    
    def validate(self,data):
        id = data.get('id')
        user_id = self.context['request'].user.id
        system_role = self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        level = data.get('level')
        #check if department is not in available roles
        
        skill = VacancySkill.objects.filter(id=id)
        if skill.exists() is False:
            raise exceptions.ValidationError('Skill vacancy does not exist')
        
        if skill.first().vacancy_role.vacancy.user.id != user_id:
            raise exceptions.ValidationError('You dont have the permissions to access this data')
        #get gripfile with this id
        return {
            "id":id,
            "user_id": user_id,
            "company_id": company_id,
            "system_role": system_role,
            "level" : level
        }
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
            skill = VacancySkill.objects.filter(id=id)
            if skill.exists() is False:
                raise exceptions.ValidationError('Job does not exist')
            if skill.first().vacancy_role.vacancy.user.id != user_id : 
                raise exceptions.ValidationError('You dont have the permissions to access this data')
        elif system_role=="admin":
            if JobVacancy.objects.filter(id=id,company_id=company_id).exists() is False:
                raise exceptions.ValidationError('Job does not exist')
        return {
            'id':id,
            'system_role':system_role,
            'user_id': user_id,
            'company_id':company_id
            }