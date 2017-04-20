from urllib.parse import urlencode

from api.helper import Fetcher


FANART_URL = 'http://webservice.fanart.tv/v3'


class FanArt:
    """API client to find posters for movies on fanart.tv"""

    def __init__(self, api_key, client=Fetcher(FANART_URL)):
        """Constructor to prepare API connection.

        :param api_key: valid API key for fanart.tv
        :param fetcher: client for making a batch of HTTP GET requests
        """
        self.api_key = api_key
        self.client = client

    def get_movie_posters(self, imdb_ids):
        """
        For each movie identified by ID, find a poster URL.

        :param imdb_ids: list of IMDb IDs
        :returns: dictionary of poster URLs by IMDb ID
        """
        def to_url(id):
            query = urlencode({'api_key': self.api_key})
            return '/movies/{}?{}'.format(id, query)

        responses = self.client.get([to_url(id) for id in imdb_ids])
        responses_data = [r.json() for r in responses if r and r.status_code == 200]

        poster_url_by_id = {}
        for response_data in responses_data:
            poster_data = response_data.get('movieposter', None)
            if not poster_data:
                continue

            id = response_data['imdb_id']
            poster_url_by_id[id] = poster_data[0]['url'] \
                .replace('/fanart', '/preview') \
                .replace('http:', 'https:')
        return poster_url_by_id
