from schema.models import PaymentIntent
from rest_framework import serializers


class ProductsListSeializer(serializers.Serializer):
    active        = serializers.BooleanField(required=False)
    name          = serializers.CharField(required=False)
    features      = serializers.ListField(required=False)
    is_subscribed = serializers.BooleanField(required=False)
    price         = serializers.FloatField(required=False)
    
    def validate(self, attrs):
        return super().validate(attrs)
    
    
class StripeIntentSerializer(serializers.ModelSerializer):
    email      = serializers.EmailField(required=False)
    plan_name  = serializers.CharField(required=True)
    company_id = serializers.IntegerField(required=False)
    
    class Meta:
        model = PaymentIntent
        fields = ("email", "plan_name", "company_id") 
        
        
class SubscriptionCancelSerializer(serializers.Serializer):
    company_id = serializers.IntegerField(required=False)
    user_id    = serializers.IntegerField(required=False)
    
    def validate(self, attrs):
        return super().validate(attrs)