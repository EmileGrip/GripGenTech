from django.views import View
from rest_framework.response import Response
from rest_framework import status
from .lib import *
from rest_framework.views import APIView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
from django.conf import settings
from schema.models import PaymentIntent
from django.core.cache import cache
from token_auth.permissions import IsAdmin
from rest_framework.permissions import IsAuthenticated
from .serializers import *


stripe.api_key = settings.STRIPE_SECRET_KEY


class ProductListView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def get(self, request):
        serializer = ProductsListSeializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        response = getAction(serializer.data, {'request': request}, request)
        return Response(response, status=status.HTTP_200_OK)


class StripeIntentView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def post(self, request):
        serializer = StripeIntentSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        response = postAction(serializer.data, {'request': request}, request)
        return Response(response, status=status.HTTP_200_OK)


class SubscriptionCancelView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    
    def post(self, request, *args, **kwargs):
        serializer = SubscriptionCancelSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        response = cancelPostAction(serializer.data, {'request': request}, request)
        return Response(response, status=status.HTTP_200_OK)
        

class SubscriptionSuccessView(View):
    def get(self, request, *args, **kwargs):
        session_id = self.request.GET.get("session_id")
        return JsonResponse({'success': True, 'message': 'Subscription created successfully'})


class SubscriptionFailureView(View):
    def get(self, request, *args, **kwargs):
        # delete payment intent from database
        session_id = self.request.GET.get("session_id")
        PaymentIntent.objects.filter(sub_id=session_id).delete() 
        return JsonResponse({'success': False, "message": "Failed to create subscription"})


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    print(payload)
    try:
        sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )

    except ValueError as e:
        return JsonResponse({'success': False, "message": "Invalid payload"}, status=400)
    except KeyError as e:
        return JsonResponse({'success': False, "message": "Missing required header"}, status=400)
    cache.delete('products')
    if event["type"] == 'customer.subscription.updated':
        handle_subscription_updated(event)
    elif event["type"] == "invoice.payment_succeeded":
        handle_payment_success(event)
    elif event["type"] == "invoice.payment_failed":
        handle_checkout_failure(event)
    elif event["type"] == "customer.subscription.deleted":
        handle_subscription_canceled(event)

    return JsonResponse({"success": True, "message": "success"})
