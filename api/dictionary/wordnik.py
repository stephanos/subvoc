from urllib.parse import urlencode

from api.dictionary.model import WordInfo
from api.helper import Fetcher


WORDNIK_URL = 'http://api.wordnik.com/v4'
ATTRIBUTION_TEXT = 'from Wiktionary, CC BY-SA License'
ATTRIBUTION_URL = 'https://creativecommons.org/licenses/by-sa/3.0'


class Wordnik:

    def __init__(self, api_key, fetcher=Fetcher(WORDNIK_URL)):
        self.api_key = api_key
        self.fetcher = fetcher

    def lookup(self, token):
        query = urlencode({
            'api_key': self.api_key,
            'includeRelated': False,
            'includeTags': False,
            'limit': 200,
            'sourceDictionaries': 'wiktionary',
            'useCanonical': False,
        })
        request_paths = ['/word.json/{}/definitions?{}'.format(token, query)]

        responses = self.fetcher.get(request_paths)
        responses_data = [r.json() for r in responses if r and r.status_code == 200]

        info = WordInfo(token, ATTRIBUTION_TEXT, ATTRIBUTION_URL)
        for response_data in responses_data:
            for entry in response_data:
                info.add_info({
                    'pos': entry['partOfSpeech'],
                    'definition': entry['text']
                })
        return info
