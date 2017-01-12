from flask import render_template

from domain.analysis import analyse


def analysis(subtitle_api, id):
    subtitle, analysis = analyse(subtitle_api, id)

    return render_template(
        'analysis.html',
        media=subtitle.media,
        analysis=analysis
    )
