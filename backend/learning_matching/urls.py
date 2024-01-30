from django.urls import path
from . import views


urlpatterns = [
    path('matches', views.MatchesView.as_view()),
    path('providers', views.Providers.as_view()),
    path('courses', views.CoursesView.as_view()),
]