from wvalidate import Validate as v

data_score = v.dict({
    "album":{
      "name": v.string(),
      "url": v.string(),
      "image_url": v.string(),
      "tracks": v.list(v.dict({
          "name": v.string(),
          "duration": v.numeric(min=0),
          "position": v.numeric()
        }))
    },
    "artist": {
      "name": v.string(),
      "image_url": v.string(),
    },
    "score": v.numeric()
})

data_album_info = v.dict({
  "artist": v.string(),
  "album": v.string(),
})