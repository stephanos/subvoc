import os
import jinja2

from web.routes.home import home
from web.routes.analysis import analysis

from api.subtitle.opensubtitles import OpenSubtitles


TEMPLATE_ROOT = 'templates'


def create_routes(app):
    app.jinja_loader = jinja2.FileSystemLoader(os.path.join(os.getcwd(), TEMPLATE_ROOT))

    opensubtitle_credentials = (app.config['OPENSUBTITLES_USER'], app.config['OPENSUBTITLES_PASS'])
    subtitle_api = OpenSubtitles(opensubtitle_credentials)

    @app.route('/')
    def home_route():
        return home(subtitle_api)

    @app.route('/<int:id>')
    def analysis_route(id):
        return analysis(subtitle_api, id)
