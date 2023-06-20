from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from server.decorators import validator
from .models import Event
from .event_validator import *
from datetime import datetime, timedelta
# Create your views here.

class CreateEvent(APIView):
  permission_classes = (permissions.IsAuthenticated,)
  authentication_classes = (SessionAuthentication,)
  
  @validator(data_event)
  def post(self, request):
    data = request.data
    
    event = Event(
      name=data['name'],
      description=data['description'],
      address=data['address'],
      city=data['city'],
      datetime=data['datetime'],
      user=request.user
    )
    event.save()
    
    return Response(data, status=status.HTTP_201_CREATED)
  
  
# class ListCloseEvent(APIView):
#   permission_classes = (permissions.IsAuthenticated,)
#   authentication_classes = (SessionAuthentication,)
  
#   def get(self, request):
#     now = datetime.datetime.now()
#     now_plus_ten_days = datetime.datetime.now() + datetime.timedelta(days=10)
          
#     Event.objects.filter(datetime__gt=now, datetime__lt=now_plus_ten_days).values()
    
#     return Response(data, status=status.HTTP_201_CREATED)
