from rest_framework import serializers
from .models import Feedback, TriageCase, Appointment

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