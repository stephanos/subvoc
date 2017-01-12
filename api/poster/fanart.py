from urllib.parse import urlencode

import grequests


FANART_URL = 'http://webservice.fanart.tv/v3'


class Fetcher:
    def get(urls, parallel=10):
        requests = [grequests.get(u) for u in urls]
        responses = grequests.map(requests, size=parallel)
        return [r.json() for r in responses if r.status_code == 200]


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
            poster_data = response['movieposter']
            if not poster_data:
                continue

            id = response['imdb_id']
            poster_url_by_id[id] = poster_data[0]['url'].replace('/fanart', '/preview')
        return poster_url_by_id
