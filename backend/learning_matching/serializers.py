from schema.models import SkillProficiency, CompanyProvider, SkillEnhancement
from rest_framework import serializers


class GetRecommendationsSerializer(serializers.ModelSerializer):
    level    = serializers.IntegerField(required=True)
    skill_id = serializers.IntegerField(required=True)
    page     = serializers.IntegerField(required=False,default=1)
    provider = serializers.ChoiceField(required=False, choices=CompanyProvider.objects
                                        .values_list('name', flat=True).distinct())
    
    class Meta:
        model = SkillProficiency
        fields = ['skill_id', 'level', 'page', 'provider']
        

class GetProviders(serializers.ModelSerializer):
    name   = serializers.CharField(required=False)
    active = serializers.BooleanField(required=False)
    class Meta:
        model = CompanyProvider 
        fields = ['name', 'active']
        

class PostProvidersSerializer(serializers.ModelSerializer):
    name = serializers.ChoiceField(choices=CompanyProvider.objects
                                   .values_list('name', flat=True).distinct())
    active = serializers.BooleanField(default=True)
    class Meta:
        model = CompanyProvider
        fields = ['name', 'active']
        
        
class GetSkilllEnhancementSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(required=False)
    level     = serializers.IntegerField(required=False)
    skill     = serializers.IntegerField(required=False)
    provider  = serializers.IntegerField(required=False)
    status    = serializers.CharField(required=False)
    
    class Meta:
        model  = SkillEnhancement
        fields = ['course_id', 'skill', 'level', 'provider', 'status']


class PostSkillEnhancementSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(required=True)
    
    class Meta:
        model  = SkillEnhancement
        fields = ('course_id', 'skill', 'level', 'provider')
        
        
class PutSkillEnhancementSerializer(serializers.ModelSerializer):
    id     = serializers.IntegerField(required=True)
    status = serializers.CharField(required=False)
    
    class Meta:
        model = SkillEnhancement
        fields = ('id', 'level', 'status', 'end_date')
        
        
class DeleteSkillEnhancementSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    
    class Meta:
        model = SkillEnhancement
        fields = ('id',)