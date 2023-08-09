from django.urls import path
from analytics.views import *

urlpatterns = [
    path('analytics', AnalyticsApi.as_view()),
]