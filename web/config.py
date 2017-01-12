import os


def create_config(app):
    config_filename = os.environ.get('CONFIG', 'config_dev')
    app.config.from_object(config_filename)
