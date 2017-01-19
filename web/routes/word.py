import simplejson as json

from flask import Response


def words_api(dictionary_api, token):
    info = dictionary_api.lookup(token)
    data = json.dumps(info.__dict__, iterable_as_array=True)
    return Response(response=data, status=200, mimetype='application/json')
