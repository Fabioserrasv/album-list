from django.urls import path
from . import views

urlpatterns = [
	path('score', views.AlbumRegister.as_view(), name='score')
]
