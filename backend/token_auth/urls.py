from django.urls import path
from token_auth.views import * 


urlpatterns = [
    path('login', Login.as_view()),
    path('refresh', Refresh.as_view()),
    path('forgot_password', ForgotPassword.as_view()),
    path('reset_password', ResetPassword.as_view()),
    path('change_password', ChangePassword.as_view()),
    path('<str:provider>/login/', OAuthLoginView.as_view()),
    path('<str:provider>/callback/<str:operation>', OAuthCallbackView.as_view()),
]