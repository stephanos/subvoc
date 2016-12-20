from flask import Flask


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    return app
