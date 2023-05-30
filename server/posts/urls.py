from django.urls import path
from . import views

urlpatterns = [
	path('create', views.CreatePost.as_view(), name='create'),
  path('list', views.ListPosts.as_view(), name='list')
]
