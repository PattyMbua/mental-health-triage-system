from rest_framework import serializers
from .models import Feedback, TriageCase, Appointment
from .models import MentorAvailability, SessionRequest

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class TriageCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriageCase
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class MentorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorAvailability
        fields = '__all__'

class SessionRequestSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    class Meta:
        model = SessionRequest
        fields = ['id', 'student_name', 'requested_date', 'status']