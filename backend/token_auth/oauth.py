import datetime
from django.conf import settings
import requests
from django.utils import timezone
from oauthlogin.exceptions import OAuthError
from oauthlogin.providers import OAuthProvider, OAuthToken, OAuthUser


SESSION_STATE_KEY = "oauthlogin_state"
SESSION_NEXT_KEY = "oauthlogin_next"


class CustomOAuthUser(OAuthUser):
    def __init__(self, *, id: str, email: str, first_name: str, last_name: str, **kwargs):
        super().__init__(id=id, email=email, **kwargs)
        self.first_name = first_name
        self.last_name = last_name
           

class GoogleOAuthProvider(OAuthProvider):
    authorization_url = "https://accounts.google.com/o/oauth2/v2/auth"
    google_token_url  = "https://oauth2.googleapis.com/token"
    google_user_url   = "https://www.googleapis.com/oauth2/v1/userinfo"
    google_emails_url = "https://www.googleapis.com/oauth2/v1/userinfo"

    def _get_token(self, request_data):
        response = requests.post(
            self.google_token_url,
            headers={
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data=request_data,
        )
        print("Response Content:", response.content)

        response.raise_for_status() 
        data = response.json()

        oauth_token = OAuthToken(
            access_token=data["access_token"],
        )

        # Expiration and refresh tokens are optional in Google depending on the app
        if "expires_in" in data:
            oauth_token.access_token_expires_at = timezone.now() + datetime.timedelta(
                seconds=data["expires_in"]
            )

        if "refresh_token" in data:
            oauth_token.refresh_token = data["refresh_token"]

        if "refresh_token_expires_in" in data:
            oauth_token.refresh_token_expires_at = timezone.now() + datetime.timedelta(
                seconds=data["refresh_token_expires_in"]
            )
        return oauth_token

    def get_authorization_url(self, request):
        params = {
            "client_id": self.get_client_id(),
            "redirect_uri": f'https://{settings.GRIP_HOST}/auth/google/callback/{request.data["operation"]}',
            "response_type": "code",
            "scope": 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
            "state": self.generate_state(),
        }
        return f"{self.authorization_url}?{requests.models.urlencode(params)}"
    
    def get_oauth_token(self, *, code, request,operation):
        request_data = {
            "client_id": self.get_client_id(),
            "client_secret": self.get_client_secret(),
            "redirect_uri": f'https://{settings.GRIP_HOST}/auth/google/callback/{operation}',
            "code": code,
            "grant_type": "authorization_code",
        }
        return self._get_token(request_data)

    def refresh_oauth_token(self, *, oauth_token):
        return self._get_token(
            {
                "client_id": self.get_client_id(),
                "client_secret": self.get_client_secret(),
                "refresh_token": oauth_token.refresh_token,
                "grant_type": "refresh_token",
            }
        )
    
    # def handle_login_request(self, *, request):
        # authorization_url = self.get_authorization_url(request=request)
        # authorization_params = self.get_authorization_url_params(request=request)

        # if "state" in authorization_params:
        #     # Store the state in the session so we can check on callback
        #     request.session[SESSION_STATE_KEY] = {"state":authorization_params["state"],
        #                                           "user_id":request.user.id if request.get('user') else None}

        # if "next" in request.POST:
        #     # Store in session so we can get it on the callback request
        #     request.session[SESSION_NEXT_KEY] = request.POST["next"]

        # # Sort authorization params for consistency
        # sorted_authorization_params = sorted(authorization_params.items())
        # redirect_url = authorization_url + "?" + urlencode(sorted_authorization_params)
        # return HttpResponseRedirect(redirect_url)

    def get_oauth_user(self, *, oauth_token, request):
        response = requests.get(
            self.google_user_url,
            headers={
                "Accept": "application/json",
                "Authorization": "Bearer " + oauth_token,
            },
        )
        response.raise_for_status()
        data = response.json()
        user_id = data["id"]
        email=data["email"]
        first_name = data["given_name"]
        last_name = data["family_name"]  

        # Use the verified, primary email address (not the public profile email, which is optional anyway)
        response = requests.get(
            self.google_emails_url,
            headers={
                "Accept": "application/json",
                "Authorization": "Bearer " + oauth_token,
            },
        )
        response.raise_for_status()
        try:
            verified_primary_email = response.json()["email"]
        except KeyError:
            raise OAuthError("A verified primary email address is required on Google")

        return CustomOAuthUser(
            id=user_id,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

        
class AzureOAuthProvider(OAuthProvider):
    tenant_id = settings.OAUTH_LOGIN_PROVIDERS['azure']['kwargs']['tenant_id']
    authorization_url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
    azure_user_url = "https://graph.microsoft.com/v1.0/me"
    azure_emails_url = "https://graph.microsoft.com/v1.0/me/emails"

    def get_azure_token_url(self):
        return f"https://login.microsoftonline.com/{self.tenant_id}/oauth2/v2.0/token"

    def _get_token(self, request_data):
        print("request_data", request_data) 
        response = requests.post(
          self.get_azure_token_url(),
            headers={
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data=request_data,
        )
        print("response", response.json()) 
        response.raise_for_status()
        data = response.json()

        oauth_token = OAuthToken(
            access_token=data["access_token"],
        )

        # Expiration and refresh tokens are optional in Azure depending on the app
        if "expires_in" in data:
            oauth_token.access_token_expires_at = timezone.now() + datetime.timedelta(
                seconds=data["expires_in"]
            )

        if "refresh_token" in data:
            oauth_token.refresh_token = data["refresh_token"]

        return oauth_token

    def get_authorization_url(self, request):
        params = {
            "client_id": self.get_client_id(),
            "redirect_uri": f'https://{settings.GRIP_HOST}/auth/azure/callback/{request.data["operation"]}',
            "response_type": "code",
            "scope": 'openid profile email',
            "state": self.generate_state(),
        }
        return f"{self.authorization_url}?{requests.models.urlencode(params)}"

    def get_oauth_token(self, *, code, request,operation):
        request_data = {
            "client_id": self.get_client_id(),
            "client_secret": self.get_client_secret(),
            "redirect_uri": f'https://{settings.GRIP_HOST}/auth/azure/callback/{operation}',
            "code": code,
            "grant_type": "authorization_code",
        }
        return self._get_token(request_data)

    def refresh_oauth_token(self, *, oauth_token):
        return self._get_token(
            {
                "client_id": self.get_client_id(),
                "client_secret": self.get_client_secret(),
                "refresh_token": oauth_token.refresh_token,
                "grant_type": "refresh_token",
            }
        )

    def get_oauth_user(self, *, oauth_token, request):
        response = requests.get(
            self.azure_user_url,
            headers={
                "Accept": "application/json",
                "Authorization": "Bearer " + oauth_token,
            },
        )
        response.raise_for_status()
        data = response.json()
        firstName = data['givenName']
        lastName = data['surname']
        uid = data['id']
        email = data['mail']
        response.raise_for_status()
        return CustomOAuthUser(
            id=uid,
            email=email,
            first_name=firstName,
            last_name=lastName,
        )