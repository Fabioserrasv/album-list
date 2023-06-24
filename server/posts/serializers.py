from user_api.serializers import UserSerializer

def convertPosts(data):
  user = UserSerializer(data.user)

  return {
    "id": data.id,
    "content": data.text,
    "user": {
      "username": data.user.username,
      "profile_pic": user.data.get('profile_pic', None)
    },
    "likes": data.likes,
    "deslikes": data.deslikes
  }