from django.urls import path
from .views import TriageCaseListCreateView, LoginView, GoogleLoginView

urlpatterns = [
    path('cases/', TriageCaseListCreateView.as_view(), name='triagecase-list-create'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/google-login/', GoogleLoginView.as_view(), name='google-login'),
]