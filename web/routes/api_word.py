import simplejson as json
from collections import OrderedDict

from flask import Response


def to_json(lookup):
    data = OrderedDict([
        ('attribution', OrderedDict([
            ('text', lookup.attribution.text),
            ('url', lookup.attribution.url)]))])

    for d in lookup.definitions:
        pos = d.partOfSpeach
        if pos not in data:
            data[pos] = []
        data[pos].append({
            'definition': d.definition,
        })

    return json.dumps(data)


def words_api(dictionary_api, token):
    lookup = dictionary_api.lookup(token)
    data = to_json(lookup)
    return Response(response=data, status=200, mimetype='application/json')
