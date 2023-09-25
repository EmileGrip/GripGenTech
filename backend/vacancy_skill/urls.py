from django.urls import path
from vacancy_skill.views import *

urlpatterns = [
    path('vacancy_skill', VacancySkillApi.as_view()),
]