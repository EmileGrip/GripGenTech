from django.urls import path
from recommendations.views import *

urlpatterns = [
    path('recommendations', RecommandationApi.as_view()),
]