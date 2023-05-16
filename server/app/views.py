from flask import Blueprint, render_template, request, flash, jsonify, send_from_directory
from flask_login import login_required, current_user
from flask_cors import cross_origin
import json
import os
from . import db

views = Blueprint('views', __name__)

@views.route('/app', defaults={'path': ''} ,methods=["GET"])
@views.route('/app/<path:path>', methods=["GET"])
@cross_origin()
def get_files(path):
    path_dir = os.path.abspath("app/front")
    if path != "" and os.path.exists(os.path.join(path_dir, path)):
        return send_from_directory(os.path.join(path_dir), path)
    else:
        return send_from_directory(os.path.join(path_dir), "index.html")

@views.route('/', methods=["GET", "POST"])
@login_required
def home():
    return render_template('home.html', user=current_user)