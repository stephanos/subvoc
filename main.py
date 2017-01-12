import os
from flask import Flask, render_template, request
from flask_assets import Bundle, Environment

from domain.search import search
from domain.analysis import analyse
from api.subtitle.opensubtitles import OpenSubtitles


CSS_ROOT = 'static/css'


app = Flask(__name__, static_url_path='/static')
assets = Environment(app)

config_filename = os.environ.get('CONFIG', 'config_dev')
app.config.from_object(config_filename)

for directory in os.listdir(CSS_ROOT):
    dir_path = os.path.join(os.getcwd(), CSS_ROOT, directory)
    if not os.path.isdir(dir_path):
        continue
    asset_paths = [os.path.join(dir_path, f) for f in os.listdir(dir_path)]
    b = Bundle(*asset_paths, filters='cssmin', output='generated/%s.css' % directory)
    assets.register(directory, b)

OPENSUBTITLES_CREDENTIALS = (app.config['OPENSUBTITLES_USER'], app.config['OPENSUBTITLES_PASS'])


@app.route('/')
def home():
    query = request.args.get('q')

    movies = []
    if query:
        api = OpenSubtitles(OPENSUBTITLES_CREDENTIALS)
        movies = search(api, query)

    return render_template(
        'home.html',
        query=query if query else '',
        result=movies
    )


@app.route('/<int:id>')
def analysis(id):
    api = OpenSubtitles(OPENSUBTITLES_CREDENTIALS)
    subtitle, analysis = analyse(api, id)
    return render_template(
        'analysis.html',
        media=subtitle.media,
        analysis=analysis
    )
