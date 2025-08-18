from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import TriageCase

User = get_user_model()

class TriageCaseTest(TestCase):
    def setUp(self):
        self.student = User.objects.create(username='student@strathmore.edu', role='student')
        self.case = TriageCase.objects.create(
            student=self.student,
            result="Refer to Mentor (Non-clinical support)",
            gender="male"
        )

    def test_case_creation(self):
        self.assertEqual(self.case.student.username, 'student@strathmore.edu')
        self.assertEqual(self.case.result, "Refer to Mentor (Non-clinical support)")
        self.assertEqual(self.case.gender, "male")
