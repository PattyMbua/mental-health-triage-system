from rest_framework import serializers
from .models import TriageCase

class TriageCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriageCase
        fields = '__all__'
        from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")