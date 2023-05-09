from django.shortcuts import render
from .models import Comment
from album.models import Album
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from .serializers import convertComments
# Create your views here.

class CreateComment(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)

  def post(self, request):
    data = request.data
    
    album = Album.objects.filter(name=data['album_name']).last()

    context = Comment.objects.filter(id=data['context']).last()

    comment = Comment(text=data['text'], context=context,  album=album, user=request.user)
    comment.save()
    
    return Response(data, status=status.HTTP_200_OK)

class ListAlbumComments(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)

  def get(self, request):
    album_name = request.GET['album_name']
    album = Album.objects.filter(name=album_name).last()
    comments = Comment.objects.filter(album=album, context=None)

    for c in comments:
      print(c.comment_children.all())
      c.get_tree()
    
    all_comments = [convertComments(x) for x in comments]
    
    return Response(all_comments, status=status.HTTP_200_OK)