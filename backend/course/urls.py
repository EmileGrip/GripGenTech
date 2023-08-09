from django.urls import path
from course.views import *

urlpatterns = [
    path('course', CourseApi.as_view()),
]