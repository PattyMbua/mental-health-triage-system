from django.urls import path
from .views import TriageCaseListCreateView

urlpatterns = [
    path('cases/', TriageCaseListCreateView.as_view(), name='triagecase-list-create'),
]