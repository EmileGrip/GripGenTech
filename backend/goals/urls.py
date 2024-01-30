from django.urls import path
from .views import *


urlpatterns = [
    path('', GoalsView.as_view(), name='goals'),
    path('actions', GoalActionsView.as_view(), name='actions'),
]