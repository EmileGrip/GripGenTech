from django.urls import path
from project_vacancy.views import *

urlpatterns = [
    path('project_vacancy', ProjectVacancyApi.as_view()),
]