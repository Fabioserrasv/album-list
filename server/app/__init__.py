from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS

from .config import config

from os import path

db = SQLAlchemy()
DB_NAME = config['DB_NAME']
DB_HOST = config['DB_HOST']
DB_USER = config['DB_USER']
DB_PASS = config['DB_PASS']

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    
    app.config['SECRET_KEY'] = config['SECRET_KEY']
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}'
    
    db.init_app(app)
    
    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/auth')
    
    from .models import User
    
    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    @app.after_request
    def after_request_func(response):
        response.headers['Access-Control-Allow-Origin']='http://localhost:3000'
        response.headers['Access-Control-Allow-Credentials']='true'
        response.headers['Access-Control-Allow-Methods']='GET, POST, PUT, OPTIONS'
        response.headers["Access-Control-Allow-Headers"]="Access-Control-Request-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept"
        return response

    return app
