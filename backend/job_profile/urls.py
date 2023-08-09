from django.urls import path
from job_profile.views import JobProfileApi

urlpatterns = [
    path('job_profile', JobProfileApi.as_view())
]