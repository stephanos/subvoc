import os

from flask_assets import Bundle, Environment


CSS_ROOT = 'static/css'


def create_assets(app):
    assets = Environment(app)

    for directory in os.listdir(CSS_ROOT):
        dir_path = os.path.join(os.getcwd(), CSS_ROOT, directory)
        if not os.path.isdir(dir_path):
            continue
        asset_paths = [os.path.join(dir_path, f) for f in os.listdir(dir_path)]
        b = Bundle(*asset_paths, filters='cssmin', output='generated/%s.css' % directory)
        assets.register(directory, b)
