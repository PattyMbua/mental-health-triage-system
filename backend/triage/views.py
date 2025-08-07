from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from .models import TriageCase, User
from .serializers import TriageCaseSerializer, LoginSerializer

class TriageCaseListCreateView(generics.ListCreateAPIView):
    queryset = TriageCase.objects.all()
    serializer_class = TriageCaseSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            return Response({
                "success": True,
                "role": user.role,
                "username": user.username
            })
        return Response({"success": False, "errors": serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST)

class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token')
        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                google_requests.Request(),
                "982795824735-7h5bc4agela88hotarcrjd0fhse7h5un.apps.googleusercontent.com"
            )
            email = idinfo['email']
            if not email.endswith('@strathmore.edu'):
                return Response({'success': False, 'error': 'Only Strathmore accounts allowed.'}, status=403)
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email.split('@')[0],
                    'role': 'student',
                }
            )
            return Response({'success': True, 'username': user.username, 'role': user.role})
        except Exception as e:
            print("GOOGLE LOGIN ERROR:", e)  # This will print the error in your Django terminal
            return Response({'success': False, 'error': str(e)}, status=400)