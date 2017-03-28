from flask import request, render_template


def home(searcher):
    query = request.args.get('q')

    movies = None
    if query:
        movies = searcher.search(query)

    return render_template(
        'home.html',
        query=query if query else '',
        result=movies
    )
