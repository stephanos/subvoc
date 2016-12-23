import base64, zlib
from xmlrpc.client import ServerProxy

OPENSUBTITLES_URL = 'http://api.opensubtitles.org/xml-rpc'
OPENSUBTITLES_UA = 'OSTestUserAgentTemp'
LANGUAGE = 'en'


def ensure_success(resp):
    if resp.get('status').split()[0] != '200':
        raise RuntimeError("received status {}".format(resp.get('status')))


class API:

    def __init__(self, credentials):
        self.token = None
        self.credentials = credentials
        self.xmlrpc = ServerProxy(OPENSUBTITLES_URL, allow_none=True)


    def login(self):
        resp = self.xmlrpc.LogIn(self.credentials[0], self.credentials[1], LANGUAGE, OPENSUBTITLES_UA)
        ensure_success(resp)
        self.token = resp.get('token')

    def find(self, query):
        if not self.token:
            self.login()

        resp = self.xmlrpc.SearchSubtitles(self.token, [query], [ { 'limit': 100 } ])
        ensure_success(resp)

        return resp.get('data')

    def find_by_query(self, query):
        return self.find({ 'query': query, 'sublanguageid': 'eng' })

    def find_subtitles_for_movie(self, movie_id):
        return self.find({ 'imdbid': movie_id, 'sublanguageid': 'eng' })

    def load_subtitle(self, subtitle_id):
        if not self.token:
            self.login()

        resp = self.xmlrpc.DownloadSubtitles(self.token, [subtitle_id])
        ensure_success(resp)

        data = resp.get('data')[0].get('data')
        data = base64.standard_b64decode(data)
        data = zlib.decompress(data, 47)

        return data
