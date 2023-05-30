from django.urls import path
from . import views

urlpatterns = [
	path('create-album-comment', views.CreateAlbumComment.as_view(), name='create-album-comment'),
  path('list-album-comments', views.ListAlbumComments.as_view(), name='list-album-comments'),
  path('put-album-like', views.PutAlbumLike.as_view(), name='put-album-like'),
	path('create-post-comment', views.CreatePostComment.as_view(), name='create-post-comment'),
  path('list-post-comments', views.ListPostComments.as_view(), name='list-post-comments'),
  path('put-post-like', views.PutPostLike.as_view(), name='put-post-like'),
]
