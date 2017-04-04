import os
import jinja2

from web.routes.api_analysis import analysis_api
from web.routes.api_search import search_api
from web.routes.api_word import words_api
from web.routes.bootstrap import bootstrap

from api.dictionary.wordnik import Wordnik
from api.subtitle.opensubtitles import OpenSubtitles
from api.poster.fanart import FanArt

from domain.analyse import Analyser
from domain.corpus import Corpus, CorpusDatabase
from domain.load import Loader
from domain.parse import Parser
from domain.search import Searcher


TEMPLATE_ROOT = 'templates'


def create_routes(app):
    app.jinja_loader = jinja2.FileSystemLoader(os.path.join(os.getcwd(), TEMPLATE_ROOT))

    opensubtitle_credentials = (app.config['OPENSUBTITLES_USER'], app.config['OPENSUBTITLES_PASS'])
    subtitle_api = OpenSubtitles(opensubtitle_credentials)

    fanart_key = app.config['FANART_TV_KEY']
    poster_api = FanArt(fanart_key)

    wordnik_key = app.config['WORDNIK_KEY']
    wordnik_api = Wordnik(wordnik_key)

    corpus = Corpus(CorpusDatabase.FULL)
    loader = Loader(subtitle_api)
    parser = Parser()
    analyser = Analyser(loader, parser, corpus)
    searcher = Searcher(subtitle_api, poster_api)

    @app.route('/')
    def home_route():
        return bootstrap()

    @app.route('/m/<id>')
    def analysis_route(id):
        return bootstrap()

    @app.route('/api/search/<query>')
    def search_api_route(query):
        return search_api(searcher, query)

    @app.route('/api/analysis/<id>')
    def analysis_api_route(id):
        return analysis_api(analyser, poster_api, id)

    @app.route('/api/words/<token>')
    def words_api_route(token):
        return words_api(wordnik_api, token)
