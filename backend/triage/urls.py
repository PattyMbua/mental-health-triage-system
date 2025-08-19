from django.urls import path
from .views import (
    GoogleLoginView,
    AssessmentSubmitView,
    MentorCasesView,
    PsychologistCasesView,
    UsernamePasswordLoginView,
    FeedbackDashboardView,
    AppointmentView,
    StudentLoginView,
    MentorLoginView,
    PsychologistLoginView,
    StudentSignupView,
)

urlpatterns = [
    path('auth/google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('assessment/submit/', AssessmentSubmitView.as_view(), name='assessment-submit'),
    path('mentor/cases/', MentorCasesView.as_view(), name='mentor-cases'),
    path('psychologist/cases/', PsychologistCasesView.as_view(), name='psychologist-cases'),
    path('login', UsernamePasswordLoginView.as_view(), name='username-password-login'),
    path('feedback/', FeedbackDashboardView.as_view(), name='feedback-dashboard'),
    path('appointment/', AppointmentView.as_view(), name='appointment'),
    path('auth/student-login/', StudentLoginView.as_view(), name='student-login'),
    path('auth/mentor-login/', MentorLoginView.as_view(), name='mentor-login'),
    path('auth/psychologist-login/', PsychologistLoginView.as_view(), name='psychologist-login'),
    path('signup/', StudentSignupView.as_view(), name='student-signup'),
]