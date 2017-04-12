import json

from flask import Response

from domain.tagger import Word


def excerpt_to_dict(excerpts):
    return [{
        'token': e.token,
        'sentences': [{
            'text': s.text
        } for s in e.sentences],
    } for e in excerpts]


def word_to_dict(analysis, token):
    result = {}
    for POS in analysis.token_with_POS[token]:
        word = Word(token, POS)
        result[POS.name.lower()] = {
            'freq': analysis.word_with_movie_freq[word],
            'excerpts': excerpt_to_dict(analysis.word_with_excerpts[word]),
        }
    return result


def token_to_dict(analysis, token):
    return {
        'byPOS': word_to_dict(analysis, token),
        'difficulty': {
            'level': analysis.token_with_difficulty[token].value,
            'label': analysis.token_with_difficulty[token].name,
            'value': 1 - (analysis.least_freq / analysis.token_with_lang_freq[token]),
        },
        'freq': analysis.token_with_movie_freq[token],
        'token': token,
    }


def generate(subtitle, analysis, poster_url):
    """
    Generator to yield JSON response in order to stream to client.

    This was necessary due to getting ERR_CONTENT_LENGTH_MISMATCH constantly
    since Flask would - for whatever reason - only send a partial response.
    """
    yield '{"media": ' + json.dumps({
        'title': subtitle.media.title,
        'poster_url': poster_url,
    }) + ', "words": ['

    tokens = list(analysis.token_with_difficulty.keys())
    for token in tokens:
        yield json.dumps(token_to_dict(analysis, token)) \
            + (',' if token is not tokens[-1] else '')

    yield ']}'


def analysis_api(analyser, poster_api, id):
    subtitle, analysis = analyser.analyse(id)
    poster_url = poster_api.get_movie_posters([id])[id]
    return Response(generate(subtitle, analysis, poster_url),
                    content_type='application/json')
