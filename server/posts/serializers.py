def convertPosts(data):
  return {
    "id": data.id,
    "content": data.text,
    "user": {
      "username": data.user.username
    },
    "likes": data.likes,
    "deslikes": data.deslikes
  }