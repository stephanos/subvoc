from collections import OrderedDict
from urllib.parse import urlencode

from api.dictionary.model import Attribution, WordDefinition, WordLookup
from api.helper import Fetcher


ATTRIBUTION = Attribution('from Wiktionary, CC BY-SA License',
                          'https://creativecommons.org/licenses/by-sa/3.0')
WORDNIK_URL = 'http://api.wordnik.com/v4'


class Wordnik:

    def __init__(self, api_key, fetcher=Fetcher(WORDNIK_URL)):
        self.api_key = api_key
        self.fetcher = fetcher

    def lookup(self, token):
        query = urlencode(OrderedDict([
            ('api_key', self.api_key),
            ('includeRelated', False),
            ('includeTags', False),
            ('limit', 200),
            ('sourceDictionaries', 'wiktionary'),
            ('useCanonical', False),
        ]))
        request_paths = ['/word.json/{}/definitions?{}'.format(token, query)]

        responses = self.fetcher.get(request_paths)
        responses_data = [r.json() for r in responses if r and r.status_code == 200]

        definitions = []
        for response_data in responses_data:
            for entry in response_data:
                definition = WordDefinition(entry['partOfSpeech'], entry['text'])
                definitions.append(definition)

        return WordLookup(token, definitions, ATTRIBUTION)
