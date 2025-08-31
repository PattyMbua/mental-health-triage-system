from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, authenticate
from .models import User, TriageCase, Feedback, Appointment
from .models import MentorAvailability, SessionRequest
from .serializers import TriageCaseSerializer, FeedbackSerializer, AppointmentSerializer, MentorAvailabilitySerializer, SessionRequestSerializer
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .authentication import GoogleJWTAuthentication
from django.contrib.auth.hashers import make_password

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
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'user_id': user.id,
                'token': str(refresh.access_token),
                'refresh': str(refresh)
            })
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


# Mentor Dashboard APIs
@api_view(['GET'])
def mentor_sessions(request):
    mentor = request.user
    sessions = SessionRequest.objects.filter(mentor=mentor, status='accepted')
    serializer = SessionRequestSerializer(sessions, many=True)
    return Response(serializer.data)

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def mentor_availability(request):
    mentor = request.user
    if request.method == 'POST':
        serializer = MentorAvailabilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(mentor=mentor)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    else:
        slots = MentorAvailability.objects.filter(mentor=mentor)
        serializer = MentorAvailabilitySerializer(slots, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pending_requests(request):
    mentor = request.user
    requests = SessionRequest.objects.filter(mentor=mentor, status='pending')
    serializer = SessionRequestSerializer(requests, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handle_request(request, request_id):
    action = request.data.get('action')
    try:
        session_request = SessionRequest.objects.get(id=request_id, mentor=request.user)
        if action == 'accept':
            session_request.status = 'accepted'
        elif action == 'decline':
            session_request.status = 'declined'
        session_request.save()
        return Response({'success': True, 'status': session_request.status})
    except SessionRequest.DoesNotExist:
        return Response({'error': 'Request not found'}, status=404)

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

class StudentLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user and user.role == 'student':
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'user_id': user.id,
                'token': str(refresh.access_token),
                'refresh': str(refresh)
            })
        return Response({'success': False, 'error': 'Invalid credentials or not a student.'}, status=status.HTTP_401_UNAUTHORIZED)

class MentorLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user and getattr(user, 'role', None) == 'mentor':
            return Response({
                'success': True,
                'user': {
                    'id': user.id,
                    'name': user.get_full_name() or user.username
                }
            })
        return Response({'success': False, 'error': 'Invalid credentials or not a mentor.'}, status=status.HTTP_401_UNAUTHORIZED)

class PsychologistLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user and getattr(user, 'role', None) == 'psychologist':
            return Response({
                'success': True,
                'user': {
                    'id': user.id,
                    'name': user.get_full_name() or user.username,
                    'role': user.role
                }
            })
        return Response({'success': False, 'error': 'Invalid credentials or not a psychologist.'}, status=status.HTTP_401_UNAUTHORIZED)


class SignupView(APIView):
    def post(self, request):
        data = request.data
        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')

        # Check for required fields
        if not username or not first_name or not last_name or not email or not password:
            return Response({'message': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Username must not contain spaces
        if ' ' in username:
            return Response({'message': 'Username must not contain spaces.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check for duplicate username/email
        if User.objects.filter(username=username).exists():
            return Response({'message': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'message': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = User.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=make_password(password),
            role='student'
        )
        return Response({'message': 'Signup successful!'}, status=status.HTTP_201_CREATED)