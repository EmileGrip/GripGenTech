from django.urls import path
from files.views import *

urlpatterns = [
    path('files', FilesApi.as_view()),
]