import base64
import json
import os
import re
import zlib
from retrying import retry
from xmlrpc.client import ServerProxy

from api.fixture import load_fixture
from api.subtitle.model import to_model


LANGUAGE = 'en'
NEWLINE_PATTERN = re.compile(r'(\r\n|\r|\n)')
OPENSUBTITLES_URL = 'http://api.opensubtitles.org/xml-rpc'
OPENSUBTITLES_UA = 'subvoc v1.0'
UNICODE_BOM = u'\N{ZERO WIDTH NO-BREAK SPACE}'


class OpenSubtitles:

    def __init__(self, credentials, client=None):
        self.token = None
        self.credentials = credentials
        self.xmlrpc = client or ServerProxy(OPENSUBTITLES_URL, allow_none=True)

    def login(self):
        username = self.credentials[0]
        password = self.credentials[1]
        resp = self.xmlrpc.LogIn(username, password, LANGUAGE, OPENSUBTITLES_UA)
        self._ensure_success(resp)
        self.token = resp.get('token')

    def find_by_query(self, query):
        qry = query.lower().strip()
        resp = self._json_fixture('query', qry) \
            or self._find({'query': qry, 'sublanguageid': 'eng'})
        return self._resp_to_model(resp)

    def find_subtitles_for_movie(self, imdb_id):
        search_id = imdb_id.replace('tt', '').lstrip('0')
        resp = self._json_fixture('id', imdb_id) \
            or self._find({'imdbid': search_id, 'sublanguageid': 'eng'})
        return self._resp_to_model(resp)

    def load_text(self, subtitle):
        resp = self._json_fixture('subtitle', subtitle.id) \
            or self._download(subtitle.id)

        text = resp.get('data')[0].get('data')
        text = base64.standard_b64decode(text)
        text = zlib.decompress(text, 47)
        text = str(text, subtitle.encoding)
        text = text.lstrip(UNICODE_BOM)
        text = re.sub(NEWLINE_PATTERN, '\n', text)

        return text

    @retry(stop_max_delay=5000, stop_max_attempt_number=3)
    def _download(self, subtitle_id):
        if not self.token:
            self.login()

        resp = self.xmlrpc.DownloadSubtitles(self.token, [subtitle_id])
        self._ensure_success(resp)
        return resp

    @retry(stop_max_delay=5000, stop_max_attempt_number=3)
    def _find(self, query):
        if not self.token:
            self.login()

        resp = self.xmlrpc.SearchSubtitles(self.token, [query], [{'limit': 500}])
        self._ensure_success(resp)
        return resp

    def _ensure_success(self, resp):
        if resp.get('status').split()[0] != '200':
            raise RuntimeError("received status {}".format(resp.get('status')))

    def _json_fixture(self, directory, arg):
        return load_fixture(os.path.join('opensubtitles', directory, '{}.json'), arg, json.loads)

    def _resp_to_model(self, resp):
        return [to_model(item) for item in resp.get('data')]
