from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('mentor', 'Mentor'),
        ('psychologist', 'Psychologist'),
    )
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    google_id = models.CharField(max_length=50, null=True, blank=True, unique=True)

class TriageCase(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cases', null=True, blank=True)
    result = models.TextField()
    gender = models.CharField(max_length=10, choices=User.GENDER_CHOICES, default='other')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_cases')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} - {self.result} ({self.gender})"

class Feedback(models.Model):
    student = models.ForeignKey('User', on_delete=models.CASCADE, related_name='feedbacks')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # Optionally add rating, mentor/psychologist, etc.

class Appointment(models.Model):
    URGENCY_CHOICES = (
        ('non-clinical', 'Non-clinical'),
        ('clinical', 'Clinical'),
    )
    student = models.ForeignKey('User', on_delete=models.CASCADE, related_name='appointments')
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES)
    notes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)