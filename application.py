from flask import Flask


def create_app(config_filename):
    app = Flask(__name__, static_url_path='/static')
    app.config.from_object(config_filename)
    return app
