import os
import jinja2

from web.routes.analysis import analysis_api, analysis_page
from web.routes.home import home
from web.routes.word import words_api

from api.dictionary.wordnik import Wordnik
from api.subtitle.opensubtitles import OpenSubtitles
from api.poster.fanart import FanArt


TEMPLATE_ROOT = 'templates'


def create_routes(app):
    app.jinja_loader = jinja2.FileSystemLoader(os.path.join(os.getcwd(), TEMPLATE_ROOT))

    opensubtitle_credentials = (app.config['OPENSUBTITLES_USER'], app.config['OPENSUBTITLES_PASS'])
    subtitle_api = OpenSubtitles(opensubtitle_credentials)

    fanart_key = app.config['FANART_TV_KEY']
    poster_api = FanArt(fanart_key)

    wordnik_key = app.config['WORDNIK_KEY']
    wordnik_api = Wordnik(wordnik_key)

    @app.route('/')
    def home_route():
        return home(subtitle_api, poster_api)

    @app.route('/m/<id>')
    def analysis_page_route(id):
        return analysis_page(subtitle_api, id)

    @app.route('/api/analysis/<id>')
    def analysis_api_route(id):
        return analysis_api(subtitle_api, poster_api, id)

    @app.route('/api/words/<token>')
    def words_api_route(token):
        return words_api(wordnik_api, token)
