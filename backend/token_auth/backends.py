import jwt

from django.conf import settings

from rest_framework import authentication, exceptions

from schema.models import GripUser

from time import mktime

from datetime import datetime, timedelta

from django.forms.models import model_to_dict

import logging

class JWTAuthentication(authentication.BaseAuthentication):
    authentication_header_prefix = 'Bearer'

    def authenticate(self, request):

        request.user = None

        token = self._GetTokenFromRequest(request)
        if token == None : 
            return None
        
        return self._AuthenticateCredentials(request, token)

    def _GetTokenFromRequest(self,request):
  
        auth_header = authentication.get_authorization_header(request).split()
        auth_header_prefix = self.authentication_header_prefix.lower()

        if not auth_header:
            return None
        elif len(auth_header) == 1:
            return None
        elif len(auth_header) > 2:
            return None
        elif auth_header[0].decode('utf-8').lower() != auth_header_prefix:
            return None
        else :
            token = auth_header[1].decode('utf-8')
            return token


    def _AuthenticateCredentials(self, request, token):
        """
        Try to authenticate the given credentials. If authentication is
        successful, return the user and token. If not, throw an error.
        """
        
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            msg = 'Authentication Error, the token has expired.'
            raise exceptions.AuthenticationFailed(msg)
        except jwt.DecodeError:
            msg = 'Authentication Error, please try again.'
            raise exceptions.AuthenticationFailed(msg)
        except jwt.InvalidTokenError:
            msg = 'Invalid authentication token.'
            raise exceptions.AuthenticationFailed(msg)

        try:
            user = GripUser.objects.get(id=payload['user']['id'])
        except GripUser.DoesNotExist:
            msg = 'No user matching this token was found.'
            raise exceptions.AuthenticationFailed(msg)

        return (user, token)



def RefreshToken (user):
    user = model_to_dict(user)
    del user['password']
    del user['date_joined']
    del user['groups']
    del user['user_permissions']
    expiration =mktime((datetime.now() + timedelta(days=settings.JWT_EXPIRATION_DAYS)).timetuple()) 

    NewToken = jwt.encode({
        'expire_in': int(expiration),
        'user': user
        },settings.SECRET_KEY, algorithm='HS256')
    return NewToken