import os
from domain.search import find_movies
from domain.opensubtitles import API
from flask import Flask, render_template, request


config_filename = os.environ.get('CONFIG', 'config_dev')
app = Flask(__name__, static_url_path='/static')


app.config.from_object(config_filename)
OPENSUBTITLES_CREDENTIALS = (app.config['OPENSUBTITLES_USER'], app.config['OPENSUBTITLES_PASS'])


@app.route('/')
def home():
    query = request.args.get('q')

    movies = []
    if query:
        api = API(OPENSUBTITLES_CREDENTIALS)
        movies = find_movies(api, query)

    return render_template('home.html',
        query=query if query else '',
        result=movies)
