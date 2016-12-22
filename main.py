import os
from flask import Flask, render_template, request
from domain.search import find_movies


config_filename = os.environ.get('CONFIG', 'config_dev')
app = Flask(__name__, static_url_path='/static')


app.config.from_object(config_filename)
OPENSUBTITLES_CREDENTIALS = (app.config['OPENSUBTITLES_USER'], app.config['OPENSUBTITLES_PASS'])


@app.route('/')
def home():
    query = request.args.get('q')
    print(query, 'true' if query else 'false')
    movies = find_movies(query, OPENSUBTITLES_CREDENTIALS) if query else ''

    return render_template('home.html',
        query=query if query else '',
        result=movies)
