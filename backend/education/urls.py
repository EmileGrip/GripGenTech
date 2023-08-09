from django.urls import path
from education.views import *

urlpatterns = [
    path('education', EducationApi.as_view()),
]