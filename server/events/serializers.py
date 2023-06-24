from user_api.serializers import UserSerializer

def convertEvent(data):
  user = UserSerializer(data.user)

  return {
    "name": data.name,
    "description": data.description,
    "address": data.address,
    "city": data.city,
    "datatime": data.datetime.strftime("%Y-%m-%dT%H:%M"),
    "user": {
      "username": user.data.get("username", "") 
    } 
  }
