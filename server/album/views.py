from django.shortcuts import render
from .models import Album, Song, Artist, UserAlbuns
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response

# Create your views here.

class AlbumRegister(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)
  
  def post(self, request):
    data = request.data

    artist = Artist.objects.filter(name=data['artist']['name']).last()
    if not artist:
      artist = Artist(name=data['artist']['name'], image_url=data['artist']['image_url']) 
      artist.save()
    
    album = Album.objects.filter(name=data['album']['name']).last()
    if not album:
      album = Album(name=data['album']['name'], artist=artist, image_url=data['album']['image_url'])
      album.save()
      for track in data['album']['tracks']:
        album.song_set.create(name=track['name'], artist=artist, duration=track['duration'], position=track['position'])

    score = UserAlbuns.objects.filter(album=album, user=request.user).last()
    if not score:
      score = UserAlbuns(album=album, user=request.user, score=data['score'])
      score.save()
      return Response(data, status=status.HTTP_201_CREATED)
      
    score.score = data['score']
    score.save()
    return Response(data, status=status.HTTP_200_OK)

# class UserAlbumList(APIView):
#   def get(self, request):
    

"""
{
  "album":{
    "name": "Album Teste",
    "url": "http://teste.com",
    "image_url": "http://teste.com",
    "tracks": [
      {
        "name": "Track 1",
        "duration": "123",
        "position": 1
      },
      {
        "name": "Track 2",
        "duration": "123",
        "position": 2
      }
    ]
  },
  "artist": {
    "name": "Arista Teste",
    "image_url": "http://teste.com"
  },
  "score": 10.0
}
"""