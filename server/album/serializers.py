from rest_framework import serializers

def convertUserAlbumList(data):
  return {
    "score": data.score,
    "artist": {
      "name": data.album.artist.name,
      "image_url": data.album.artist.image_url,
    },
    "album": {
      "image_url": data.album.image_url,
      "name": data.album.name,
      "tracks": [],
      "url": data.album.url,
    }
  }