from django.urls import path
from . import views

urlpatterns = [
	path('create', views.CreateEvent.as_view(), name='create')
]
