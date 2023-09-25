from django.urls import path
from job_vacancy.views import *

urlpatterns = [
    path('job_vacancy', JobVacancyApi.as_view()),
]