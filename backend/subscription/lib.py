from datetime import datetime
from django.conf import settings
from django.http import JsonResponse
from django.core.cache import cache
import stripe
from schema.models import GripUser, Company, PaymentIntent
from django.core.mail import send_mail
from rest_framework.validators import ValidationError

stripe.api_key = settings.STRIPE_SECRET_KEY

def getProducts(company_id): 
    products = cache.get('products')
    if products:
        return products 
    if products is None:
        products = stripe.Product.list()
        product_list = []
        
        # Add a free trial product
        product_list.append({ 
            "name": "Free Trial",
            "features": ["Access to all features", "Add the rest of the company later"], 
            "price": 0, 
            "is_subscribed": Company.objects.filter(
                plan="free trial", status="Active", 
                id=company_id
            ).exists()
        })

        for product in products["data"]:
            if product["active"]:  # Only add active products
                price = stripe.Price.retrieve(product["default_price"])
                features = [feature["name"] for feature in product["features"]] 
                product_list.append({
                    "name": product["name"],
                    "features": features,
                    "price": "{:.2f}".format(price["unit_amount"] / 100),
                    "default_price_id": product["default_price"],
                    "is_subscribed": Company.objects.filter(
                        plan=product["name"].split()[0], status="Active", 
                        id=company_id
                    ).exists()
                })

        cache.set('products', product_list)  # Cache for 24 hours
        return product_list
    
    
def getAction(data, context, request):
    company_id = request.user.company_id.id
    
    product_list = getProducts(company_id)
    return {
        "success": True,
        "message": "The list of products",
        "payload": product_list
    }
    
    
def stripIntent(email, plan_name, company_id):
    if not plan_name:
        raise ValidationError("Plan name is required")
    
    if plan_name not in ("Essentials Plan", "Professional Plan"):
        raise ValidationError("Invalid price name, must be 'Essentials Plan' or 'Professional Plan'")

    # Fetch Price ID
    cached_products = cache.get('products')
    if cached_products is None:
        cached_products = getProducts(company_id)
    if plan_name == "Professional Plan":
        price_id = cached_products[1]["default_price_id"]
    else:
        price_id = cached_products[2]["default_price_id"]
    
    user = GripUser.objects.get(email=email)
    if user.system_role != "admin":
        raise ValidationError("Only admin can create a subscription")

    customers = stripe.Customer.list(email=email)
    if len(customers.data) > 0:
        customer = customers.data[0]
    else:
        customer = stripe.Customer.create(email=email)
    # Check if the company already has an active subscription
    if Company.objects.filter(id=user.company_id.id, status="Active").exists():
        # Fetch the latest subscription for the company
        subscription = PaymentIntent.objects.filter(company=user.company_id, payment_status="Paid").last()

        # Use the subscription ID to delete the subscription
        stripe.Subscription.delete(subscription.sub_id)

        # Update company status
        company = Company.objects.get(id=user.company_id.id)
        company.status = 'Cancelled'
        company.save()

    stripe_price = stripe.Price.retrieve(price_id)
    quantity = GripUser.objects.filter(company_id=user.company_id).count()

    checkout_session = stripe.checkout.Session.create(
        payment_method_types=["card", "sepa_debit"],
        line_items=[
            {
                "price": stripe_price.id,
                "quantity": quantity,
            },
        ],
        metadata={
            'company_id': str(user.company_id.id)
        },
        mode="subscription",
        success_url="https://adepti.gen-tech.io/admin/settings/billing?payment_success=true&",
        cancel_url="https://adepti.gen-tech.io/admin/settings/billing?payment_success=false&",
        customer=customer.id,
    )
    # Save PaymentIntent
    p = PaymentIntent.objects.create(
        company=user.company_id,
        user=user,
        price_id=price_id,
        quantity=quantity,
        stripe_customer=customer.id,
        payment_status="Pending",
    )
    cache.delete('products')
    print("p", p)
    return checkout_session


def postAction(data, context, request):    
    try:
        email      = context['request'].user.email
        plan_name  = request.data.get("plan_name")  
        company_id = request.data.get("company_id")
        check_url  = stripIntent(email, plan_name, company_id)
        
        return {
            "success": True,
            "message": "checkout session created", 
            "payload": {
                "redirect_url": check_url.url
            }   
        }
    except ValidationError as e:
        return {'success': False, 'message': str(e.args[0])}

    
def cancelSubscription(user_id, company_id):
    # if free trial cancel it
    if Company.objects.filter(id=company_id, plan="free trial", status="Active").exists():
        company = Company.objects.get(id=company_id)
        company.status = 'Cancelled'
        company.save()
    elif PaymentIntent.objects.filter(company=company_id).exists():
        subscription_id = PaymentIntent.objects.filter(company=company_id).last().sub_id

        # Use the subscription ID to delete the subscription
        stripe.Subscription.delete(subscription_id)

        # Update company status
        company = Company.objects.get(id=company_id)
        company.status = 'Cancelled'
        company.save()
    else:
        raise ValidationError("Subscription not found")


def cancelPostAction(data, context, request):
    try:
        user_id = context['request'].user.id
        company_id = context['request'].user.company_id.id
        cancelSubscription(user_id, company_id)
        return {
            "success": True,
            "message": "Subscription cancelled successfully",
        }
    except ValidationError as e:
        return {'success': False, 'message': str(e.args[0])}
    

def handle_subscription_updated(event):
    cache.delete('products')
    session = event['data']['object']
    print(session)
    stripe_sub_id = session['id']
    print("Subscription updated", stripe_sub_id)
    # Find the corresponding PaymentIntent
    subscription = PaymentIntent.objects.filter(
        price_id=session['plan']['id'],
        stripe_customer=session['customer']
    ).last()

    # Check if the subscription was successfully paid
    if session['status'] == 'active':
        # Update the PaymentIntent status to 'Paid'
        subscription.payment_status = 'Paid'
        
        # Update company details based on the subscription plan
        company = Company.objects.filter(id=subscription.company.id).last()
        if session['plan']['id'] == 'price_1OHtDoEztX6m8CynFkKxrcE3':
            company.plan = 'Essentials'
        else:
            company.plan = 'Professional'
        company.start_date = str(datetime.fromtimestamp(session['current_period_start']))
        company.end_date = str(datetime.fromtimestamp(session['current_period_end']))
        company.status = 'Active'
        company.save()

    # Save the changes to the PaymentIntent
    subscription.sub_id = stripe_sub_id
    subscription.save()
    
    return JsonResponse({
        'success': True,
        'message': 'Subscription updated successfully',
        'payload': {
            "subscription_id": subscription.id,
            "customer": subscription.stripe_customer,
            "company_id": subscription.company.id
        }
    })


def handle_payment_success(event):
    try:
        customer_email = event["data"]["object"]["customer_email"]

        # Send a confirmation email to the customer
        send_mail(
            "Payment Successful",
            """Congratulations! 🎉 Your payment has been successfully processed, 
            and your subscription is now active. Thank you for choosing us! 🌟 
            We're thrilled to have you on board.
            """,
            settings.EMAIL_HOST_USER,
            [customer_email],
            fail_silently=False,
        )
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)


def handle_subscription_canceled(event):
    try:
        print("handle_subscription_canceled called")
        customer_id = event["data"]["object"]["customer"]
        customer = stripe.Customer.retrieve(customer_id)
        customer_email = customer["email"]
        paymentIntent = PaymentIntent.objects.filter(stripe_customer=customer_id)
        paymentIntent.delete()
        
        # Send a cancellation email to the customer
        send_mail(
            "Subscription Canceled",
            """We wanted to inform you that your subscription has been canceled successfully. 
            If this was unintentional or if you have any questions, 
            please don't hesitate to reach out to our support team.
            We appreciate your time with us and hope to serve you again in the future. 
            Thank you for being a valued part of our community!
            Best regards,
            Adapti""",
            settings.EMAIL_HOST_USER,
            [customer_email],
            fail_silently=False,
        )
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)


def handle_checkout_failure(event):
    try:
        # Access the customer's email from the event data
        customer_email = event["data"]["object"]["customer_email"]
        subscription   = PaymentIntent.objects.filter(sub_id=event["data"]["object"]["subscription"]).last()
        subscription.company.status = 'Failed'
        subscription.save()
        
        # Send an email to the customer about the payment failure
        send_mail(
            "Payment Failed",
            "Your payment failed. Please try again.",
            settings.EMAIL_HOST_USER,
            [customer_email],
            fail_silently=False,
        )
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)
   
    