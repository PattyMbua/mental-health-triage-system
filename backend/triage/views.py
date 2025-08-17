from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, authenticate
from .models import User, TriageCase, Feedback, Appointment
from .serializers import TriageCaseSerializer, FeedbackSerializer, AppointmentSerializer
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from rest_framework.permissions import IsAuthenticated
from .authentication import GoogleJWTAuthentication

class TriageCaseListCreateView(generics.ListCreateAPIView):
    queryset = TriageCase.objects.all()
    serializer_class = TriageCaseSerializer

class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token')
        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                google_requests.Request(),
                "982795824735-7h5bc4agela88hotarcrjd0fhse7h5un.apps.googleusercontent.com"
            )
            email = idinfo.get('email')
            # Identify student by email domain
            if not email or not email.endswith('@strathmore.edu'):
                return Response({'success': False, 'error': 'Only Strathmore student accounts are allowed.'}, status=status.HTTP_403_FORBIDDEN)
            google_id = idinfo['sub']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            # Always create as student
            user, created = User.objects.get_or_create(
                username=email,
                defaults={
                    'email': email,
                    'first_name': first_name,
                    'last_name': last_name,
                    'role': 'student',  # Force role to student
                    'google_id': google_id,
                }
            )
            if not created:
                user.google_id = google_id
                user.role = 'student'  # Ensure role is student
                user.save()
            login(request, user)
            return Response({'success': True, 'user_id': user.id})
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

class AssessmentSubmitView(APIView):
    authentication_classes = [GoogleJWTAuthentication]
    permission_classes = []  # GoogleJWTAuthentication handles permission

    def post(self, request):
        student = request.user
        result = request.data.get('result')
        gender = request.data.get('gender')

        if not result or not gender or not isinstance(result, str) or result.strip() == '':
            return Response({'success': False, 'error': 'Missing or invalid result or gender.'}, status=status.HTTP_400_BAD_REQUEST)

        if not hasattr(student, 'role') or student.role != 'student':
            return Response({'success': False, 'error': 'Only students can submit assessments.'}, status=status.HTTP_403_FORBIDDEN)

        if "Psychologist" in result:
            assigned = User.objects.filter(role='psychologist', gender=gender).first()
        else:
            assigned = User.objects.filter(role='mentor', gender=gender).first()
        case = TriageCase.objects.create(
            student=student,
            result=result,
            gender=gender,
            assigned_to=assigned
        )
        return Response({'success': True, 'case_id': case.id}, status=status.HTTP_201_CREATED)

class MentorCasesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        mentor = request.user
        cases = TriageCase.objects.filter(assigned_to=mentor)
        serializer = TriageCaseSerializer(cases, many=True)
        return Response(serializer.data)

class PsychologistCasesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        psychologist = request.user
        cases = TriageCase.objects.filter(assigned_to=psychologist)
        serializer = TriageCaseSerializer(cases, many=True)
        return Response(serializer.data)

class UsernamePasswordLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None and user.role in ['mentor', 'psychologist']:
            # You can generate a token here if you use JWT or session
            return Response({
                'success': True,
                'user': {
                    'id': user.id,
                    'role': user.role,
                    'name': user.get_full_name() or user.username,
                },
                'token': '',  # Add JWT token here if using JWT
            })
        return Response({'success': False, 'message': 'Invalid credentials or role.'}, status=status.HTTP_401_UNAUTHORIZED)

class FeedbackDashboardView(APIView):
    authentication_classes = [GoogleJWTAuthentication]
    permission_classes = []

    def post(self, request):
        student = request.user
        message = request.data.get('message')
        if not message or not hasattr(student, 'role') or student.role != 'student':
            return Response({'success': False, 'error': 'Only students can submit feedback and message is required.'}, status=403)
        feedback = Feedback.objects.create(student=student, message=message)
        return Response({'success': True, 'feedback': feedback.id})

class AppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != 'student':
            return Response({'success': False, 'error': 'Only students can book appointments.'}, status=403)
        serializer = AppointmentSerializer(data={**request.data, 'student': request.user.id})
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'appointment': serializer.data})
        return Response({'success': False, 'error': serializer.errors}, status=400)