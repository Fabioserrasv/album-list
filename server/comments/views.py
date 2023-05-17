from django.shortcuts import render
from .models import Comment, Likes
from album.models import Album, Artist
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


class PutLike(APIView):
  def post(self, request):
    data = request.data

    comment = Comment.objects.filter(id=data['comment_id']).last()
    
    if data['like_type']:
      like_type = Likes.TypeLike.UP_LIKE if data['like_type'] == 'like' else Likes.TypeLike.DOWN_LIKE
  
    current = Likes.objects.filter(comment=comment, user=request.user).last()

    if not current:
      like = Likes(user=request.user, type=like_type, comment=comment)
      like.save()
    elif current.type == like_type:
      current.delete()
    else:
      current.type = like_type
      current.save()
    
    return Response({}, status=status.HTTP_200_OK)
