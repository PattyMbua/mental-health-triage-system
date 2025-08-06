from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)