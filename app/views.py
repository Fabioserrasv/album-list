from flask import Blueprint, render_template, request, flash, jsonify, send_from_directory
from flask_login import login_required, current_user

import json
import os
from . import db
from .models import Note

views = Blueprint('views', __name__)

@views.route('/app', defaults={'path': ''} ,methods=["GET"])
@views.route('/app/<path:path>', methods=["GET"])
def get_files(path):
    path_dir = os.path.abspath("app/front")
    if path != "" and os.path.exists(os.path.join(path_dir, path)):
        return send_from_directory(os.path.join(path_dir), path)
    else:
        return send_from_directory(os.path.join(path_dir), "index.html")

@views.route('/', methods=["GET", "POST"])
@login_required
def home():
    if request.method == 'POST':
        note = request.form.get('note')

        if len(note) < 1:
            flash('Texto da nota é muito curto!', category='error')
        else:
            new_note = Note(data=note, user_id=current_user.id)
            db.session.add(new_note) 
            db.session.commit()
            flash('Nota incluída', category='success')
        
    return render_template('home.html', user=current_user)


@views.route('/delete-note', methods=['POST'])
def delete_note():  
    note = json.loads(request.data)
    noteId = note['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()

    return jsonify({})