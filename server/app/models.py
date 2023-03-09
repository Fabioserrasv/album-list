from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy.orm import mapped_column
from sqlalchemy import ForeignKey

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))

class UserAlbumList(db.Model):
    user_id = mapped_column(ForeignKey("User.id"), primary_key=True)
    album_id = mapped_column(
        ForeignKey("Album.id"), primary_key=True
    )

class Artist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    image_url = db.Column(db.String(1000))
    albums = db.relationship('Album')
    
class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    image_url = db.Column(db.String(1000))
    tags = db.Column(db.String(1000))
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))
    songs = db.relationship('Song')

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    artist = db.relationship('Artist')