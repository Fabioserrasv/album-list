from django.db import models
from user_api.models import AppUser as User

# Create your models here.

class Artist(models.Model):
  name = models.CharField(max_length=255)
  image_url = models.CharField(max_length=1000)
    
class Album(models.Model):
  name = models.CharField(max_length=255)
  url  = models.CharField(max_length=1000)
  image_url = models.CharField(max_length=1000)
  tags = models.CharField(max_length=1000)
  artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
  
class UserAlbuns(models.Model):
  album = models.ForeignKey(Album, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  score = models.FloatField(default=0.00)

  def __str__(self) -> str:
    return str(dir(self))

class Song(models.Model):
  name = models.CharField(max_length=255)
  position = models.IntegerField(default=0)
  duration = models.IntegerField(default=0)
  album = models.ForeignKey(Album, on_delete=models.CASCADE)
  artist = models.ForeignKey(Artist, on_delete=models.CASCADE)