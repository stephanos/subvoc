import base64
import re
import zlib
from retrying import retry
from xmlrpc.client import ServerProxy

from api.subtitle.model import to_model


LANGUAGE = 'en'
NEWLINE_PATTERN = re.compile(r'(\r\n|\r|\n)')
OPENSUBTITLES_URL = 'http://api.opensubtitles.org/xml-rpc'
OPENSUBTITLES_UA = 'subvoc v1.0'
UNICODE_BOM = u'\N{ZERO WIDTH NO-BREAK SPACE}'


def ensure_success(resp):
    if resp.get('status').split()[0] != '200':
        raise RuntimeError("received status {}".format(resp.get('status')))


def create_client():
    return ServerProxy(OPENSUBTITLES_URL, allow_none=True)


class OpenSubtitles:

    def __init__(self, credentials, create_client=create_client):
        self.token = None
        self.credentials = credentials
        self.xmlrpc = create_client()

    def login(self):
        username = self.credentials[0]
        password = self.credentials[1]
        resp = self.xmlrpc.LogIn(username, password, LANGUAGE, OPENSUBTITLES_UA)
        ensure_success(resp)
        self.token = resp.get('token')

    @retry(stop_max_delay=5000, stop_max_attempt_number=3)
    def find(self, query):
        if not self.token:
            self.login()

        resp = self.xmlrpc.SearchSubtitles(self.token, [query], [{'limit': 500}])
        ensure_success(resp)

        return [to_model(item) for item in resp.get('data')]

    def find_by_query(self, query):
        return self.find({'query': query, 'sublanguageid': 'eng'})

    def find_subtitles_for_movie(self, imdb_id, lang):
        search_id = imdb_id.replace('tt', '').lstrip('0')
        return self.find({'imdbid': search_id, 'sublanguageid': lang})

    @retry(stop_max_delay=5000, stop_max_attempt_number=3)
    def load_text(self, subtitle):
        if not self.token:
            self.login()

        resp = self.xmlrpc.DownloadSubtitles(self.token, [subtitle.id])
        ensure_success(resp)

        text = resp.get('data')[0].get('data')
        text = base64.standard_b64decode(text)
        text = zlib.decompress(text, 47)
        text = str(text, subtitle.encoding)
        text = text.lstrip(UNICODE_BOM)
        text = re.sub(NEWLINE_PATTERN, '\n', text)

        return text
