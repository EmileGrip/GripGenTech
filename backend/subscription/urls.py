from django.urls import path
from . import views


urlpatterns = [
    path('products', views.ProductListView.as_view()),
    path('create-payment-intent', views.StripeIntentView.as_view()),
    path('cancel', views.SubscriptionCancelView.as_view()),
    path('webhook/', views.stripe_webhook),
]