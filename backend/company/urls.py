from django.urls import path
from company.views import *

urlpatterns = [
    path('company', CompanyApi.as_view()),
]