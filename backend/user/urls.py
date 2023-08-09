from django.urls import path
from user.views import *

urlpatterns = [
    path('user', UserApi.as_view()),
]