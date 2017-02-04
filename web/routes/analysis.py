import simplejson as json
from datetime import timedelta
from enum import Enum
from flask import render_template, Response

from domain.analysis import analyse


class AnalysisEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.name
        elif isinstance(obj, tuple):
            return dict(obj)
        elif isinstance(obj, timedelta):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


def analysis_page(subtitle_api, id):
    return render_template('analysis.html')


def analysis_api(subtitle_api, id):
    subtitle, analysis = analyse(subtitle_api, id)

    words = ({
        'word': w,
        'difficulty': {
            'level': analysis.word_with_difficulty[w].value,
            'label': analysis.word_with_difficulty[w].name,
        },
        'sentences': analysis.sentences_with_word[w],
        'freq': analysis.word_with_lang_freq[w],
    } for w in sorted(analysis.word_with_lang_freq, key=lambda x: analysis.word_with_lang_freq[x]))

    data = json.dumps({
        'media': {
            'title': subtitle.media.title,
        },
        'words': words
    }, cls=AnalysisEncoder, iterable_as_array=True)

    return Response(response=data, status=200, mimetype='application/json')
