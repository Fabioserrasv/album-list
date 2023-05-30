from django.shortcuts import render
from .models import AlbumComment, AlbumCommentLikes, PostComment, PostCommentLikes
from album.models import Album, Artist
from posts.models import Post
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from .serializers import convertComments
from server.decorators import validator
from .comments_validator import *
# Create your views here.

class CreateAlbumComment(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)
  
  @validator(data_album_comment)
  def post(self, request):
    data = request.data
    
    artist = Artist.objects.filter(name=data['artist_name']).last()
    album = Album.objects.filter(name=data['album_name'], artist=artist).last()

    context = AlbumComment.objects.filter(id=data['context']).last()

    comment = AlbumComment(text=data['text'], context=context,  album=album, user=request.user)
    comment.save()
    
    return Response(data, status=status.HTTP_200_OK)

class ListAlbumComments(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)

  @validator(data_list_album_comments)
  def get(self, request):
    album_name = request.GET['album_name']
    artist_name = request.GET['artist_name']

    artist = Artist.objects.filter(name=artist_name).last()
    album = Album.objects.filter(name=album_name, artist=artist).last()

    comments = AlbumComment.objects.filter(album=album, context=None)

    for c in comments:
      c.get_tree()
    
    all_comments = [convertComments(x) for x in comments]
    
    return Response(all_comments, status=status.HTTP_200_OK)


class PutAlbumLike(APIView):
  @validator(data_put_like)
  def put(self, request):
    data = request.data

    comment = AlbumComment.objects.filter(id=data['comment_id']).last()
    
    if data['like_type']:
      like_type = AlbumCommentLikes.TypeLike.UP_LIKE if data['like_type'] == 'like' else AlbumCommentLikes.TypeLike.DOWN_LIKE
  
    current = AlbumCommentLikes.objects.filter(comment=comment, user=request.user).last()

    if not current:
      like = AlbumCommentLikes(user=request.user, type=like_type, comment=comment)
      like.save()
    elif current.type == like_type:
      current.delete()
    else:
      current.type = like_type
      current.save()
    
    return Response({}, status=status.HTTP_200_OK)



# --------------------------------------------------------------

class CreatePostComment(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)
  
  @validator(data_post_comment)
  def post(self, request):
    data = request.data
    
    post = Post.objects.filter(id=data['post_id']).last()

    context = PostComment.objects.filter(id=data['context']).last()

    comment = PostComment(text=data['text'], context=context,  post=post, user=request.user)
    comment.save()
    
    return Response(data, status=status.HTTP_200_OK)

class ListPostComments(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)

  def get(self, request):
    post_id = request.GET['post_id']
    post = Post.objects.filter(id=post_id).last()
    comments = PostComment.objects.filter(post=post, context=None)

    for c in comments:
      c.get_tree()
    
    all_comments = [convertComments(x) for x in comments]
    
    return Response(all_comments, status=status.HTTP_200_OK)


class PutPostLike(APIView):
  
  @validator(data_put_like)
  def put(self, request):
    data = request.data

    comment = PostComment.objects.filter(id=data['comment_id']).last()
    
    if data['like_type']:
      like_type = PostCommentLikes.TypeLike.UP_LIKE if data['like_type'] == 'like' else PostCommentLikes.TypeLike.DOWN_LIKE
  
    current = PostCommentLikes.objects.filter(comment=comment, user=request.user).last()

    if not current:
      like = PostCommentLikes(user=request.user, type=like_type, comment=comment)
      like.save()
    elif current.type == like_type:
      current.delete()
    else:
      current.type = like_type
      current.save()
    
    return Response({}, status=status.HTTP_200_OK)
