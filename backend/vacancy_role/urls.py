from django.urls import path
from vacancy_role.views import *

urlpatterns = [
    path('vacancy_role', VacancyRoleApi.as_view()),
]