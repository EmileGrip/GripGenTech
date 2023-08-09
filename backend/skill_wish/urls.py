from django.urls import path
from skill_wish.views import SkillWishApi

urlpatterns = [
    path('skill_wish', SkillWishApi.as_view())
]