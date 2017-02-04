import simplejson as json
from datetime import timedelta
from enum import Enum
from flask import render_template, Response

from domain.analysis import analyse, Word


class AnalysisEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.name
        elif isinstance(obj, timedelta):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


def analysis_page(subtitle_api, id):
    return render_template('analysis.html')


def analysis_api(subtitle_api, id):
    subtitle, analysis = analyse(subtitle_api, id)

    def word_to_dict(token):
        result = {}
        for POS in analysis.token_with_POS[token]:
            word = Word(token, POS)
            result[POS.name] = {
                'freq': analysis.word_with_movie_freq[word],
                'sentences': analysis.word_with_sentence[word],
            }
        return result

    def token_to_dict(token):
        return {
            'byPOS': word_to_dict(token),
            'difficulty': {
                'level': analysis.token_with_difficulty[token].value,
                'label': analysis.token_with_difficulty[token].name,
            },
            'freq': analysis.token_with_lang_freq[token],
            'token': token,
        }

    data = json.dumps({
        'media': {
            'title': subtitle.media.title,
        },
        'words': (token_to_dict(token) for token in analysis.tokens
                  if token in analysis.token_with_difficulty)
    }, cls=AnalysisEncoder, iterable_as_array=True)

    return Response(response=data, status=200, mimetype='application/json')
