from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from .models import User

GOOGLE_CLIENT_ID = "982795824735-7h5bc4agela88hotarcrjd0fhse7h5un.apps.googleusercontent.com"

class GoogleJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token = auth_header.split(' ')[1]
        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)
            email = idinfo.get('email')
            if not email or not email.endswith('@strathmore.edu'):
                raise exceptions.AuthenticationFailed('Only Strathmore student emails are allowed.')
            user, created = User.objects.get_or_create(
                username=email,
                defaults={
                    'email': email,
                    'first_name': idinfo.get('given_name', ''),
                    'last_name': idinfo.get('family_name', ''),
                    'role': 'student',
                    'google_id': idinfo['sub'],
                }
            )
            return (user, None)
        except Exception as e:
            raise exceptions.AuthenticationFailed('Invalid Google token: ' + str(e))