from flask import Blueprint, render_template, request, flash, jsonify, send_from_directory
from flask_login import login_required, current_user

import json
import os
from . import db
from .models import Artist

api = Blueprint('api', __name__)

@api.route('/', methods=["POST"])
@login_required
def save_artist():
    if request.method == 'POST':
        name = request.form.get('name')
        image_url = request.form.get('image_url')

        if len(name) < 1:
            flash('Nome do artista é muito curto!', category='error')
        else:
            new_artist = Artist(name=name, image_url=image_url)
            db.session.add(new_artist) 
            db.session.commit()
        
    return True;

@api.route('/', methods=["POST"])
@login_required
def save_album():
    if request.method == 'POST':
        name = request.form.get('name')
        image_url = request.form.get('image_url')

        if len(name) < 1:
            flash('Nome do artista é muito curto!', category='error')
        else:
            new_artist = Artist(name=name, image_url=image_url)
            db.session.add(new_artist) 
            db.session.commit()
        
    return True;
