from django.shortcuts import render
from .models import Post
from user_api.models import AppUser as User
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from server.decorators import validator
from .post_validator import data_post
from .serializers import convertPosts
# Create your views here.

class CreatePost(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)
  
  @validator(data_post)
  def post(self, request):
    data = request.data
    
    post = Post(text=data['content'], user=request.user)
    post.save()
    
    post.get_likes()

    return Response(convertPosts(post), status=status.HTTP_200_OK)


class ListPosts(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)

  def get(self, request):
    posts = Post.objects.all().order_by('-id')[:10]

    for p in posts:
      p.get_likes()
    
    all_posts = [convertPosts(x) for x in posts]
    
    return Response(all_posts, status=status.HTTP_200_OK)