from django.urls import path
from skill_profile.views import SkillProfileApi

urlpatterns = [
    path('skill_profile', SkillProfileApi.as_view())
]