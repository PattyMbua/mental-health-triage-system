from django.urls import path
from .views import TriageCaseListCreateView, LoginView

urlpatterns = [
    path('cases/', TriageCaseListCreateView.as_view(), name='triagecase-list-create'),
]
urlpatterns = [
    path('cases/', TriageCaseListCreateView.as_view(), name='triagecase-list-create'),
    path('auth/login/', LoginView.as_view(), name='login'),
]