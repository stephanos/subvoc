from flask import request, render_template

from domain.search import search


def home(subtitle_api, poster_api):
    query = request.args.get('q')

    movies = []
    if query:
        movies = search(subtitle_api, poster_api, query)

    return render_template(
        'home.html',
        query=query if query else '',
        result=movies
    )
