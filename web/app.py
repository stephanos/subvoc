from flask import Flask
from flask_json import FlaskJSON

from web.assets import create_assets
from web.config import create_config
from web.routing import create_routes


def create_app():
    app = Flask(__name__, static_url_path='/static')
    FlaskJSON(app)
    create_config(app)
    create_assets(app)
    create_routes(app)
    return app
