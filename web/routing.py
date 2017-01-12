import os
import jinja2

from web.routes.home import home
from web.routes.analysis import analysis

from api.subtitle.opensubtitles import OpenSubtitles
from api.poster.fanart import FanArt


TEMPLATE_ROOT = 'templates'


def create_routes(app):
    app.jinja_loader = jinja2.FileSystemLoader(os.path.join(os.getcwd(), TEMPLATE_ROOT))

    opensubtitle_credentials = (app.config['OPENSUBTITLES_USER'], app.config['OPENSUBTITLES_PASS'])
    subtitle_api = OpenSubtitles(opensubtitle_credentials)

    fanart_key = app.config['FANART_TV_KEY']
    poster_api = FanArt(fanart_key)

    @app.route('/')
    def home_route():
        return home(subtitle_api, poster_api)

    @app.route('/m/<id>')
    def analysis_route(id):
        return analysis(subtitle_api, id)