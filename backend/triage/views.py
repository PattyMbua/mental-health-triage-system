from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import TriageCase
from .serializers import TriageCaseSerializer

class TriageCaseListCreateView(generics.ListCreateAPIView):
    queryset = TriageCase.objects.all()
    serializer_class = TriageCaseSerializer