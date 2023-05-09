def convertComments(data):
  return {
    "id": data.id,
    "text": data.text,
    "descendents": [convertComments(x) for x in data.descendents],
    "user": {
      "username": data.user.username
    },
    "likes": data.likes,
    "deslikes": data.deslikes
  }