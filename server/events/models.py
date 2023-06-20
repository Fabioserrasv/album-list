from django.db import models
from user_api.models import AppUser as User

# Create your models here.

class Event(models.Model):
  name = models.CharField(max_length=255)
  description = models.TextField()
  address = models.CharField(max_length=255)
  city = models.CharField(max_length=50)
  datetime = models.DateTimeField()
  user = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

