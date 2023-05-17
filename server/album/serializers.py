from rest_framework import serializers

def convertUserAlbumList(album, score):
  return {
    "score": score,
    "artist": {
      "name": album.artist.name,
      "image_url": album.artist.image_url,
    },
    "album": {
      "image_url": album.image_url,
      "name": album.name,
      "tracks": [],
      "url": album.url,
    }
  }