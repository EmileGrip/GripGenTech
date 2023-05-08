"""
Definition of urls for griphr-backend.
"""
from django.urls import path, include

urlpatterns = [
    path('auth/', include('token_auth.urls')),
    path('tenancy/', include('tenancy.urls')),
]
