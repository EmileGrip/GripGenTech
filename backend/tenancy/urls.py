from django.urls import path
from .views import *

urlpatterns = [
    path('create', CreateTable.as_view()),
    path('add', AddEntryToTable.as_view()),
    path('get', GetEntryFromTable.as_view()),
]