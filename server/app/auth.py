from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User
from .repositories.auth_repository import get_data_from_user
import json
auth = Blueprint('auth', __name__)

from .repositories.user_repository import validate_user_sign_up

@auth.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        values = json.loads(request.data) # checar pq request.form.get não está pegando
        email = values['email']
        password = values['password']
        
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
                return jsonify({
                    'email': user.email,
                    'name': user.first_name
                }), 200
            else:
                return jsonify({'message': 'Senha incorreta!'}), 404
        else:
            return jsonify({'message': 'Usuário não encontrado!'}), 404

    # return render_template("login.html", user=current_user)


@auth.get('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Deslogado com sucesso!'}), 200

@auth.route('/signup', methods=['POST'])
def sign_up():
    values = json.loads(request.data) # checar pq request.form.get não está pegando
    email = values['email']
    first_name = values['name']
    password1 = values['password1']

    user = User.query.filter_by(email=email).first()
    if not validate_user_sign_up(user, values):
        return jsonify({'message': 'Dados incorretos'}), 400
    else:
        new_user = User(
            email=email,
            first_name=first_name, 
            password=generate_password_hash(password1, method='sha256')
        )
            
        db.session.add(new_user)
        db.session.commit()
            
        login_user(new_user, remember=True)
        return jsonify(get_data_from_user(current_user)), 200

@auth.get('/user-information')
@login_required
def user_information():
    return jsonify(get_data_from_user(current_user)), 200 

