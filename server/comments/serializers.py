from user_api.serializers import UserSerializer

def convertComments(data):
  user = UserSerializer(data.user)
  return {
    "id": data.id,
    "text": data.text,
    "descendents": [convertComments(x) for x in data.descendents],
    "user": {
      "profile_pic": user.data.get('profile_pic', None),
      "username": user.data.get('username', None)
    },
    "likes": data.likes,
    "deslikes": data.deslikes,
    "intention": data.intention
  }