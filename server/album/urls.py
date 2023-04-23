from django.urls import path
from . import views

urlpatterns = [
	path('score', views.AlbumRegister.as_view(), name='score'),
	path('user-album-list', views.UserAlbumList.as_view(), name='user-album-list'),
	path('album-info', views.AlbumInfo.as_view(), name='album-info'),
  
]
