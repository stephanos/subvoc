from urllib.parse import urlencode
from requests import Session
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

import grequests


FANART_URL = 'http://webservice.fanart.tv/v3'

s = Session()
s.mount(FANART_URL,
        HTTPAdapter(max_retries=Retry(
                total=5, status_forcelist=[500, 502, 503, 504, 520, 521])))


class Fetcher:
    def get(self, urls, parallel=10):
        requests = [grequests.get(u, session=s) for u in urls]
        responses = grequests.map(requests, size=parallel)
        return [r.json() for r in responses if r and r.status_code == 200]


class FanArt:

    def __init__(self, api_key, fetcher=Fetcher()):
        self.api_key = api_key
        self.fetcher = fetcher

    def get_movie_posters(self, imdb_ids):
        def to_url(id):
            query = urlencode({'api_key': self.api_key})
            return '{}/movies/{}?{}'.format(FANART_URL, id, query)

        responses = self.fetcher.get([to_url(id) for id in imdb_ids])

        poster_url_by_id = {}
        for response in responses:
            poster_data = response.get('movieposter', None)
            if not poster_data:
                continue

            id = response['imdb_id']
            poster_url_by_id[id] = poster_data[0]['url'].replace('/fanart', '/preview')
        return poster_url_by_id
