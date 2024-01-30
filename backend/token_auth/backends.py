from django.http import HttpResponseRedirect, JsonResponse
import jwt
from django.conf import settings
from rest_framework import authentication, exceptions
from schema.models import Company, GripUser, OAuthUserProfile, Person
from time import mktime
from datetime import datetime, timedelta
from django.forms.models import model_to_dict
from schema.utils import get_node_id
from token_auth.oauth import AzureOAuthProvider, GoogleOAuthProvider
from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password
from token_auth.serializers import OAuthSerializer


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


def get_authentication_code(provider_key: str, provider_config: dict):
    """
    Generates the authentication code for a given provider.

    :param provider_key: The key of the provider (e.g., 'google', 'azure').
    :param provider_config: The configuration for the provider.
    :return: The authentication code for the provider.
    """
    if provider_key == 'google':
        provider = GoogleOAuthProvider(provider_key=provider_key, client_id=provider_config['kwargs']['client_id'], client_secret=provider_config['kwargs']['client_secret'])
    elif provider_key == 'azure':
        provider = AzureOAuthProvider(provider_key=provider_key, client_id=provider_config['kwargs']['client_id'], client_secret=provider_config['kwargs']['client_value_secret'])

    return provider


def authCodeGetAction(request, **kwargs):
    provider_key = kwargs.get('provider')
    provider_config = settings.OAUTH_LOGIN_PROVIDERS.get(provider_key) 
    
    # check if provider key is valid
    if not provider_config: 
       raise exceptions.ValidationError({'provider': ['Invalid OAuth provider key.']})
   
    provider  = get_authentication_code(provider_key, provider_config)
    authorization_url = provider.get_authorization_url(request=request) 
    return {
        "success": True,
        "message": "generated authorization url",
        "payload": {"authorization_url": authorization_url}
    }    


def authentication_callback(request, provider, provider_key,operation):
    code = request.GET.get('code')
    
    # check if code is valid
    if not code:
        return exceptions.ValidationError({'code': ['code is required.']})
    
    # get oauth token and user data
    result = provider.get_oauth_token(code=code, request=request,operation=operation)
    access_token = result.access_token
    provider_user = provider.get_oauth_user(oauth_token=access_token, request=request)

    # save user data
    oauth_user = OAuthUserProfile.objects.filter(uid=provider_user.id).first()
    if not oauth_user:
        oauth_user = OAuthUserProfile.objects.create(
            provider=provider_key,
            uid=provider_user.id,
            email=provider_user.email,
        )
    grip_user = GripUser.objects.filter(email=provider_user.email).first()
    if not grip_user:
        if operation == "login":
            #redirect to login page with error message: email not found in system, please signup first
            redirect_url = f'https://{settings.SITE_DOMAIN}/?error=Email%20not%20found%20in%20system,%20please%20signup%20first'
            return HttpResponseRedirect(redirect_url)
        grip_user = GripUser.objects.create(
            email=provider_user.email,
            username=provider_user.email,
            first_name=provider_user.first_name,
            last_name=provider_user.last_name,
            system_role="admin",
            company_id=Company.objects.create(name="New Company"),
            password=make_password(get_random_string(length=8))
        )
        person_id = Person(name=provider_user.first_name + " " + 
                            provider_user.last_name 
                            ,company_id=str(grip_user.company_id))
        person_id.save()
        grip_user.person_id = get_node_id(person_id)
        grip_user.save()
        oauth_user.user = grip_user
        oauth_user.save()
    else:
        if operation == "signup":
            #redirect to signup page with error message: email already exists, please login
            redirect_url = f'https://{settings.SITE_DOMAIN}/signup?error=Email%20already%20exists,%20please%20login'
            return HttpResponseRedirect(redirect_url)
    # generate access token 
    GripUser.objects.filter(email=provider_user.email).update(last_login=datetime.now())
    user_serializer = OAuthSerializer(grip_user)
    serialized_user = user_serializer.data 
    expiration = mktime(
        (datetime.now() + timedelta(days=settings.JWT_EXPIRATION_DAYS)).timetuple()
    )
    access_token = jwt.encode(
        {
            'expire_in': int(expiration), 
            'user': serialized_user,
            },
        settings.SECRET_KEY,
        algorithm='HS256'
    )
    print("access_token", access_token) 
    redirect_url = f'https://{settings.SITE_DOMAIN}/admin/employees?token=' + access_token
    return HttpResponseRedirect(redirect_url)


def callbackGetAction(request, **kwargs):
    provider_key = kwargs.get('provider')
    operation = kwargs.get('operation')
    provider_config = settings.OAUTH_LOGIN_PROVIDERS.get(provider_key)
    if not provider_config:
        raise exceptions.ValidationError({'provider': ['Invalid OAuth provider key.']})
    provider = get_authentication_code(provider_key=kwargs.get('provider'), 
                                       provider_config=provider_config)    
    return authentication_callback(request=request, provider=provider, provider_key=provider, operation=operation)