from urllib.parse import urlencode

from api.helper import Fetcher


FANART_URL = 'http://webservice.fanart.tv/v3'


class FanArt:

    def __init__(self, api_key, fetcher=Fetcher(FANART_URL)):
        self.api_key = api_key
        self.fetcher = fetcher

    def get_movie_posters(self, imdb_ids):
        def to_url(id):
            query = urlencode({'api_key': self.api_key})
            return '/movies/{}?{}'.format(id, query)

        responses = self.fetcher.get([to_url(id) for id in imdb_ids])
        responses_data = [r.json() for r in responses if r and r.status_code == 200]

        poster_url_by_id = {}
        for response_data in responses_data:
            poster_data = response_data.get('movieposter', None)
            if not poster_data:
                continue

            id = response_data['imdb_id']
            poster_url_by_id[id] = poster_data[0]['url'].replace('/fanart', '/preview')
        return poster_url_by_id
