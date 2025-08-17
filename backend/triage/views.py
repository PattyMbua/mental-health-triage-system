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
            if not email or not email.endswith('@strathmore.edu'):
                return Response({'success': False, 'error': 'Only Strathmore emails are allowed.'}, status=status.HTTP_403_FORBIDDEN)
            google_id = idinfo['sub']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            user, created = User.objects.get_or_create(
                username=email,
                defaults={
                    'email': email,
                    'first_name': first_name,
                    'last_name': last_name,
                    'role': 'student',
                    'google_id': google_id,
                }
            )
            if not created:
                user.google_id = google_id
                user.save()
            login(request, user)
            return Response({'success': True, 'user_id': user.id})
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

class AssessmentSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        student = request.user
        result = request.data.get('result')
        gender = request.data.get('gender')

        if not result or not gender:
            return Response({'success': False, 'error': 'Missing result or gender.'}, status=400)

        if student.role != 'student':
            return Response({'success': False, 'error': 'Only students can submit assessments.'}, status=403)

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
        return Response({'success': True, 'case_id': case.id}, status=201)

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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Students see their feedback, mentors/psychologists see all
        if request.user.role == 'student':
            feedbacks = Feedback.objects.filter(student=request.user)
        else:
            feedbacks = Feedback.objects.all()
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Students can submit feedback
        if request.user.role != 'student':
            return Response({'success': False, 'error': 'Only students can submit feedback.'}, status=403)
        serializer = FeedbackSerializer(data={**request.data, 'student': request.user.id})
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'feedback': serializer.data})
        return Response({'success': False, 'error': serializer.errors}, status=400)

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