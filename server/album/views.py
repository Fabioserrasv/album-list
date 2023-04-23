from django.shortcuts import render
from .models import Album, Song, Artist, UserAlbuns
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from .serializers import convertUserAlbumList
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
      album = Album(name=data['album']['name'], artist=artist, image_url=data['album']['image_url'], url=data['album']['url'])
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

class UserAlbumList(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)

  def get(self, request):
    albuns = UserAlbuns.objects.filter(user=request.user)
    result = [convertUserAlbumList(x) for x in albuns]

    return Response(result, status=status.HTTP_200_OK)

class AlbumInfo(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)

  def get(self, request):

    artist_name = request.GET['artist']
    album_name = request.GET['album']

    artist = Artist.objects.filter(name=artist_name).last()
    if not artist:
      return Response({}, status=status.HTTP_404_NOT_FOUND)
    
    album = Album.objects.filter(name=album_name, artist=artist).last()
    result = {}
    
    if album:
      result = UserAlbuns.objects.filter(user=request.user, album=album).last()
      result = convertUserAlbumList(result)
      return Response(result, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_404_NOT_FOUND)

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