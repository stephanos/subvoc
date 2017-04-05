import simplejson as json

from flask import render_template, Response

from domain.analyse import Word


def analysis_page(subtitle_api, id):
    return render_template('analysis.html')


def analysis_api(analyser, poster_api, id):
    subtitle, analysis = analyser.analyse(id)
    poster_url = poster_api.get_movie_posters([id])[id]

    def excerpt_to_dict(excerpts):
        return ({
            'token': e.token,
            'sentences': ({
                'text': s.text
            } for s in e.sentences),
        } for e in excerpts)

    def word_to_dict(token):
        result = {}
        for POS in analysis.token_with_POS[token]:
            word = Word(token, POS)
            result[POS.name.lower()] = {
                'freq': analysis.word_with_movie_freq[word],
                'excerpts': excerpt_to_dict(analysis.word_with_excerpts[word]),
            }
        return result

    def token_to_dict(token):
        return {
            'byPOS': word_to_dict(token),
            'difficulty': {
                'level': analysis.token_with_difficulty[token].value,
                'label': analysis.token_with_difficulty[token].name,
                'value': 1 - (analysis.least_freq / analysis.token_with_lang_freq[token]),
            },
            'freq': analysis.token_with_movie_freq[token],
            'token': token,
        }

    data = json.dumps({
        'media': {
            'title': subtitle.media.title,
            'poster_url': poster_url,
        },
        'words': (token_to_dict(token) for token in analysis.token_with_difficulty.keys())
    }, iterable_as_array=True)

    return Response(status=200,
                    response=data,
                    mimetype='application/json')
