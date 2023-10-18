from django.urls import path
from endorsement.views import *

urlpatterns = [
    path('endorsement', EndorsementApi.as_view()),
]