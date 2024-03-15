from flask import Flask
from flask_cors import CORS
from src.routes.auth import routes_auth 
from src.database.db_mysql import init_db
from config import Config

app = Flask(__name__)

def init__app():

    CORS(app)

    app.config.from_object(Config)

    init_db(app)

    app.register_blueprint(routes_auth, url_prefix = "/api" )

    return app

