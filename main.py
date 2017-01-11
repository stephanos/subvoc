import os
from flask import Flask, render_template, request

from domain.search import search
from domain.analysis import analyse
from api.subtitle.opensubtitles import OpenSubtitles


config_filename = os.environ.get('CONFIG', 'config_dev')
app = Flask(__name__, static_url_path='/static')


app.config.from_object(config_filename)
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
