from django.urls import path
from . import views

urlpatterns = [
	path('create', views.CreateComment.as_view(), name='create'),
  path('list_comments', views.ListAlbumComments.as_view(), name='list_comments'),
  path('put_like', views.PutLike.as_view(), name='put_like')
]
