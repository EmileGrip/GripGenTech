from django.urls import path
from role.views import RoleApi

urlpatterns = [
    path('role', RoleApi.as_view())
]