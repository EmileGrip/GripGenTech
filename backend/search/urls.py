from django.urls import path
from search.views import SearchApi

urlpatterns = [
    path('search', SearchApi.as_view())
]