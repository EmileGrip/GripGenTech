from rest_framework import serializers, exceptions
from schema.models import GripUser
from schema.models import Token, OAuthUserProfile
from datetime import datetime, timedelta
from time import mktime
from django.core.mail import send_mail
from django.conf import settings
import jwt
import logging
from secrets import choice
from  string import ascii_uppercase, digits
from django.forms.models import model_to_dict
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from requests import post


class LoginRequestSerilizer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)
    token = serializers.CharField(max_length=1000)

    def get_token(self):
        return self.access_token
    
    def get_response(self):
        return self.response

    def validate(self, data):

        email = data.get("email", None)
        password = data.get("password", None)
        token = data.get("token", None)

        if email is None:
            raise exceptions.ValidationError(
                'email is required to log in.'
            )

        if password is None:
            raise exceptions.ValidationError(
                'A password is required to log in.'
            )
        if not GripUser.objects.filter(email=email).exists():
            raise exceptions.ValidationError(
                'email dose not exist.'
            )
        if validate_turnsite_token(token) is False:
            raise exceptions.ValidationError(
                'invalid token.'
            )
        user = GripUser.objects.filter(email=email).first()
        if not user.check_password(password):
            raise exceptions.ValidationError(
                'wrong password.'
            )
        user = model_to_dict(user)
        del user['password']
        del user['date_joined']
        del user['groups']
        del user['user_permissions']
        #convert datetime to string
        if user["last_login"] is not None:
            user["last_login"] = user["last_login"].strftime("%Y-%m-%d %H:%M:%S")
        #edit last login
        GripUser.objects.filter(email=email).update(last_login=datetime.now())
        
        expiration =mktime((datetime.now() + timedelta(days=settings.JWT_EXPIRATION_DAYS)).timetuple()) 

        self.access_token = jwt.encode({
            'expire_in': int(expiration),
            'user': user
            },settings.SECRET_KEY, algorithm='HS256')
        
        self.response = {
            "success":True,
            "message":"User logged in  successfully",
            "payload": {
                'token': self.access_token
            }
        }

        return {
            'email': email,
            'password': password
        }


class ForgotPasswordRequestSerilizer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField(max_length=1000)
    def get_response(self):
        return self.response
    
    def validate(self, data):

        email = data.get("email", None)
        token = data.get("token", None)

        if email is None:
            raise exceptions.ValidationError(
                'email is required to reset password.'
            )

        if not GripUser.objects.filter(email=email).exists():
            self.response = {
                "success":True,
                "message":"Email sent successfully, please check your email for password reset token"
            }
            return {
                'email': email,
            }
        if token is None:
            raise exceptions.ValidationError(
                'token is required to reset password.'
            )
        if validate_turnsite_token(token) is False:
            raise exceptions.ValidationError(
                'invalid token.'
            )
        user = GripUser.objects.filter(email=email).first()
        #deactivate all previous tokens
        Token.objects.filter(user_id=user,type="reset_password").update(is_active=False)
        token = Token.objects.create(
            user_id=user,
            token=self.__generate_random_token(),
            created_at=datetime.now(),
            expire_at=datetime.now() + timedelta(seconds=settings.PASSWORD_RESET_TIMEOUT),
            is_active=True,
            type="reset_password"
            )
        
        try:
            html_message, plain_message = get_formatted_email(settings.EMAIL_PASSWORD_RESET_TEMPLATE,token=token.token)
            send_mail(
                'User Account Password Reset',
                plain_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                html_message=html_message,
                fail_silently=False,
            )
            self.response = {
                "success":True,
                "message":"Email sent successfully, please check your email for password reset token"
            }
        except Exception as e:
            self.response = {
                "success":False,
                "message":"Error sending email, please try again later"
            }
            logging.error(e)
        return {
            'email': email,
        }
    
    def __generate_random_token(self,l=32):
        """
        Generate a random string of letters and digits
        """       
        return ''.join(choice(ascii_uppercase + digits) for i in range(l))

class ResetPasswordRequestSerilizer(serializers.Serializer):
    email = serializers.EmailField()
    email_confirmation = serializers.CharField(max_length=200)
    new_password1 = serializers.CharField(max_length=20)
    new_password2 = serializers.CharField(max_length=20)

    def get_response(self):
        return self.response
    
    def validate(self, data):

        email = data.get("email", None)
        email_confirmation = data.get("email_confirmation", None)
        new_password1 = data.get("new_password1", None)
        new_password2 = data.get("new_password2", None)

        if email is None:
            raise exceptions.ValidationError(
                'email is required to reset password.'
            )
        if email_confirmation is None:
            raise exceptions.ValidationError(
                'email confirmation is required to reset password.'
            )
        if new_password1 is None:
            raise exceptions.ValidationError(
                'new password is required to reset password.'
            )

        if new_password2 != new_password1:
            raise exceptions.ValidationError(
                'password mismatch.'
            )


        if not GripUser.objects.filter(email=email).exists():
            raise exceptions.ValidationError(
                'email dose not exist.'
            )
        #get all active tokens
        
        user = GripUser.objects.filter(email=email).first()
        tokens = Token.objects.filter(user_id=user,type="reset_password",is_active=True)
        if not tokens.exists():
            raise exceptions.ValidationError(
                'no active password reset tokens.'
            )
        #check if token is valid
        token = tokens.first()
        if token.token != email_confirmation:
            raise exceptions.ValidationError(
                'invalid email confirmation.'
            )
        
        try:
            user.set_password(new_password1)
            user.save()
            
        except Exception as e:
            raise exceptions.ValidationError(
                'error changing password.'
            )
        #deactivate all previous tokens
        Token.objects.filter(user_id=user,type="reset_password").update(is_active=False)
        #send email to user that password has been changed
        try:
            html_message, plain_message = get_formatted_email(settings.EMAIL_CONFIRMATION_TEMPLATE)
            send_mail(
                'User Account Password Changed',
                plain_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                html_message=html_message,
                fail_silently=False,
            )
        except Exception as e:
            logging.error(e)
        
        self.response = {
            "success":True,
            "message":"Password changed successfully"
        }
        return {
            'token': email_confirmation,
            'user': user,
        }

class ChangePasswordRequestSerilizer(serializers.Serializer):
    
    old_password = serializers.CharField(max_length=20)
    new_password1 = serializers.CharField(max_length=20)
    new_password2 = serializers.CharField(max_length=20)

    def get_response(self):
        return self.response
    
    def validate(self, data):

        
        old_password = data.get("old_password", None)
        new_password1 = data.get("new_password1", None)
        new_password2 = data.get("new_password2", None)


        if old_password is None:
            raise exceptions.ValidationError(
                'email confirmation is required to reset password.'
            )
        if new_password1 is None:
            raise exceptions.ValidationError(
                'new password is required to reset password.'
            )

        if new_password2 != new_password1:
            raise exceptions.ValidationError(
                'password mismatch.'
            )

        #get user inatance
        user= self.context.get("request").user


        if not user.check_password(old_password):
            raise exceptions.ValidationError(
                'wrong password.'
            )
        try:
            user.set_password(new_password1)
            user.save()
            self.response = {
                "success":True,
                "message":"Password changed successfully"
            }
        except Exception as e:
            self.response = {
                "success":False,
                "message":"Error changing password, please try again later"
            }
        return {
            'old_password': old_password,
            'new_password1': new_password1,
            'new_password2': new_password2
        }


def get_formatted_email(template,**vars):
    html_content = render_to_string(template, dict(vars)) # render with dynamic value
    text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.
    return html_content,text_content

def validate_turnsite_token(token):
    if settings.DEBUG:
        return True
    resp = post('https://challenges.cloudflare.com/turnstile/v0/siteverify', data={'response': token,'secret': settings.CLOUDFLARE_TURNSTILE_SECRET})
    data = resp.json()
    if data['success']:
        return True
    else:
        return False
    

class OAuthSerializer(serializers.ModelSerializer):
    uid           = serializers.CharField(required=False)
    provider      = serializers.CharField(max_length=20, required=False)
    first_name    = serializers.CharField(max_length=50, required=False)
    last_name     = serializers.CharField(max_length=50, required=False)
    phone         = serializers.CharField(required=False)
    id            = serializers.CharField(required=False)
    gender        = serializers.CharField(required=False)
    location      = serializers.CharField(required=False)
    username      = serializers.CharField(required=False)
    system_role   = serializers.CharField(required=False)
    person_id     = serializers.CharField(required=False)
    resume        = serializers.CharField(required=False)
    profile_pic   = serializers.CharField(required=False)
    email         = serializers.EmailField(required=False)
    is_staff      = serializers.BooleanField(required=False)
    is_active     = serializers.BooleanField(required=False)    
    is_superuser  = serializers.BooleanField(required=False)
    company_id_id = serializers.IntegerField(required=False)

    
    class Meta:
        model  = OAuthUserProfile
        fields = ['uid', 'email', 'provider', 'first_name', 'last_name', 
                  'is_staff', 'is_active', 'id', 'is_superuser', 'username',
                  'system_role', 'company_id_id', 'person_id', 'resume',
                  'profile_pic', 'gender', 'phone', 'location']
    
    
class OAuthLoginRequestSerilizer(serializers.ModelSerializer):
    provider = serializers.CharField(max_length=20, required=False)
    token    = serializers.CharField(max_length=1000)
    operation= serializers.ChoiceField(choices=['login','signup'],required=False)
    
    class Meta:
        model  = OAuthUserProfile
        fields = ['provider', 'token', 'operation']
    
    def validate(self, data): 
        # get token from body
        token = data.get("token", None)
        if validate_turnsite_token(token) is False:
            raise exceptions.ValidationError(
                'invalid token.'
            )
        return data 