import simplejson as json
from enum import Enum
from flask import render_template, Response

from domain.analysis import analyse


class AnalysisEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.name
        return json.JSONEncoder.default(self, obj)


def analysis_page(subtitle_api, id):
    return render_template('analysis.html')


def analysis_api(subtitle_api, id):
    subtitle, analysis = analyse(subtitle_api, id)

    data = json.dumps({
        'media': {
            'title': subtitle.media.title,
        },
        'words': analysis.words_by_difficulty()
    }, cls=AnalysisEncoder, iterable_as_array=True)

    return Response(response=data, status=200, mimetype='application/json')
