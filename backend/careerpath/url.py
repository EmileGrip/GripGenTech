from django.urls import path
from careerpath.views import PathApi

urlpatterns = [
    path('career_path', PathApi.as_view())
]