"""
Definition of urls for griphr-backend.
"""
from django.urls import path, include

urlpatterns = [
    path('', include('user.urls')),
    path('', include('company.urls')),
    path('', include('experience.urls')),
    path('', include('education.urls')),
    path('auth/', include('token_auth.urls')),
    path('', include('search.urls')),
    path('', include('job_profile.urls')),
    path('', include('skill_profile.urls')),
    path('', include('skill_proficiency.urls')),
    path('', include('role.urls')),
    path('', include('analytics.urls')),
    path('', include('course.urls')),
    path('', include('careerpath.url')),
    path('', include('files.url')),
    path('', include('skill_wish.urls')),
    path('', include('recommendations.urls')),
    path('', include('job_vacancy.urls')),
    path('', include('vacancy_role.urls')),
    path('', include('vacancy_skill.urls')),
]
