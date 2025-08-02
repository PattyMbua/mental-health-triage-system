from django.db import models

# Create your models here.
from django.db import models

class TriageCase(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    symptoms = models.TextField()
    risk_level = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.risk_level})"