from django.urls import path
from skill_proficiency.views import SkillProficiencyApi

urlpatterns = [
    path('skill_proficiency', SkillProficiencyApi.as_view())
]