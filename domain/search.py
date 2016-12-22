from xmlrpc.client import ServerProxy

OPENSUBTITLES_URL = 'http://api.opensubtitles.org/xml-rpc'
OPENSUBTITLES_UA = 'OSTestUserAgentTemp'
LANGUAGE = 'en'

def to_movie(item):
    return {
        'id': item.get('IDMovieImdb'),
        'title': item.get('MovieName'),
        'year': item.get('MovieYear'),
        'kind': item.get('MovieKind'),
    }

def find_movies(query, credentials):
    xmlrpc = ServerProxy(OPENSUBTITLES_URL, allow_none=True)

    user_agent = "{} v1".format(credentials[0])
    resp = xmlrpc.LogIn(credentials[0], credentials[1], LANGUAGE, OPENSUBTITLES_UA)
    if resp.get('status').split()[0] != '200':
        raise RuntimeError("received status {}".format(resp.get('status')))
    token = resp.get('token')

    resp = xmlrpc.SearchSubtitles(token, [
            { 'sublanguageid': 'en' },
            { 'query': query }
        ], [ { 'limit': 100 } ])
    if resp.get('status').split()[0] != '200':
        raise RuntimeError("received status {}".format(resp.get('status')))

    all_movies = [to_movie(item) for item in resp.get('data')]
    unique_movies = { m['id']: m for m in all_movies }.values()
    return unique_movies
