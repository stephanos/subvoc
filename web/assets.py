import os
from collections import namedtuple

from flask_assets import Bundle, Environment


CSS_ROOT = 'static/css'
JS_ROOT = 'static/js'

Resource = namedtuple('Resource', ['name', 'bundle'])


def dir_to_resources(root_dir, filters, file_type):
    resources = []
    for directory in os.listdir(root_dir):
        dir_path = os.path.join(os.getcwd(), root_dir, directory)
        if not os.path.isdir(dir_path):
            continue
        asset_paths = [os.path.join(dir_path, f) for f in os.listdir(dir_path)]
        asset_file_paths = [f for f in asset_paths if f.endswith(file_type)]
        b = Bundle(*asset_file_paths,
                   filters=filters,
                   output='generated/{}.{}'.format(directory, file_type))

        asset_name = '{}-{}'.format(directory, file_type)
        resources.append(Resource(asset_name, b))
    return resources


def create_assets(app):
    assets = Environment(app)
    resources = \
        dir_to_resources(CSS_ROOT, 'cssmin', 'css') + \
        dir_to_resources(JS_ROOT, 'rjsmin', 'js')
    for resource in resources:
        assets.register(resource.name, resource.bundle)
