from collections import OrderedDict


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

    return data


def words_api(dictionary_api, token):
    lookup = dictionary_api.lookup(token)
    return to_json(lookup)
