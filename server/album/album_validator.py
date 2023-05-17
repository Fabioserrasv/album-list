from server.validator import *

data_score = {
    "album":{
      "name": ValidatorStr(),
      "url": ValidatorStr(),
      "image_url": ValidatorStr(),
      # "tracks": [
      #   {
      #     "name": ValidatorStr(),
      #     "duration": "123",
      #     "position": 1
      #   },
      #   {
      #     "name": "Track 2",
      #     "duration": "123",
      #     "position": 2
      #   }
      # ]
    },
    "artist": {
      "name": ValidatorStr(),
      "image_url": ValidatorStr()
    },
    "score": ValidatorNumeric()
}

data_album_info = {
  "artist": ValidatorStr(),
  "album": ValidatorStr(),
}