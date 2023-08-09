from django.urls import path
from experience.views import ExperienceApi

urlpatterns = [
    path('experience', ExperienceApi.as_view())
]