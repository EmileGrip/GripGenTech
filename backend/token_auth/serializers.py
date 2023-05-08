
from rest_framework import serializers, exceptions
from schema.models import GripUser
from .tokens import UserPasswordResetTokenGenerator
from datetime import datetime, timedelta
from time import mktime
from django.core.mail import EmailMessage
from django.conf import settings
import jwt
import logging



class LoginRequestSerilizer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)
    token = serializers.SerializerMethodField()

    def get_token(self):
        return self.access_token

    def validate(self, data):

        email = data.get("email", None)
        password = data.get("password", None)


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
        user = GripUser.objects.filter(email=email).first()
        if not user.check_password(password):
            raise exceptions.ValidationError(
                'wrong password.'
            )

        expiration =mktime((datetime.now() + timedelta(days=settings.JWT_EXPIRATION_DAYS)).timetuple()) 

        self.access_token = jwt.encode({
            'exp': int(expiration),
            'user_id': user.id
            },settings.SECRET_KEY, algorithm='HS256')

        return {
            'email': email,
            'password': password
        }


class ForgotPasswordRequestRequestSerilizer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):

        email = data.get("email", None)
        

        if email is None:
            raise exceptions.ValidationError(
                'email is required to reset password.'
            )

        if not GripUser.objects.filter(email=email).exists():
            raise exceptions.ValidationError(
                'email dose not exist.'
            )
        user = GripUser.objects.filter(email=email).first()
        token = UserPasswordResetTokenGenerator.make_token(user)
        TokenMessage = EmailMessage('User Account Password Reset',
                                    'your account password reset tocken is {}'.format(token),
                                    to=[email])
        TokenMessage.send()
        return {
            'email': email,
        }

class ResetPasswordRequestSerilizer(serializers.Serializer):
    email = serializers.EmailField()
    email_confirmation = serializers.CharField(max_length=200)
    new_password1 = serializers.CharField(max_length=20)
    new_password2 = serializers.CharField(max_length=20)

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
        user = GripUser.objects.filter(email=email).first()
        if not UserPasswordResetTokenGenerator.check_token(user, email_confirmation):
            raise exceptions.ValidationError(
                'invalid confirmation token.'
            )
        user.set_password(new_password1)
        if not user.check_password(new_password1):
            raise exceptions.ValidationError(
                'error changing password.'
            )
        user.save()
        return {
            'token': email_confirmation,
            'user': user,
        }

class ChangePasswordRequestSerilizer(serializers.Serializer):
    
    old_password = serializers.CharField(max_length=20)
    new_password1 = serializers.CharField(max_length=20)
    new_password2 = serializers.CharField(max_length=20)

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


        if not self.context.check_password(old_password):
            raise exceptions.ValidationError(
                'wrong password.'
            )

        self.context.set_password(new_password1)
        if not self.context.check_password(new_password1):
            raise exceptions.ValidationError(
                'error changing password.'
            )
        self.context.save()
        return {
            'old_password': old_password,
            'new_password1': new_password1,
            'new_password2': new_password2
        }

