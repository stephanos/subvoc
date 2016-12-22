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

    def find_by_query(self, query):
        if not self.token:
            self.login()

        resp = self.xmlrpc.SearchSubtitles(self.token, [
                { 'sublanguageid': 'en' },
                { 'query': query }
            ], [ { 'limit': 100 } ])
        ensure_success(resp)

        return resp.get('data')
