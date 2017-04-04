import simplejson as json

from flask import Response


def to_json(media):
    data = [{
        'id': m.id,
        'title': m.title,
        'poster_url': m.poster_url
    } for m in media]
    return json.dumps(data)


def search_api(searcher, query):
    media = searcher.search(query)
    data = to_json(media)
    return Response(response=data, status=200, mimetype='application/json')
