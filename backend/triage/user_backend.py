from django.contrib.auth.backends import ModelBackend
from triage.models import User

class CustomUserBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        user = super().authenticate(request, username=username, password=password, **kwargs)
        if user and getattr(user, 'role', None) in ['student', 'mentor', 'psychologist']:
            return user
        return None