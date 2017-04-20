from collections import OrderedDict
from urllib.parse import urlencode

from api.dictionary.model import Attribution, WordDefinition, WordLookup
from api.helper import Fetcher


ATTRIBUTION = Attribution('from Wiktionary, CC BY-SA License',
                          'https://creativecommons.org/licenses/by-sa/3.0')
WORDNIK_URL = 'http://api.wordnik.com/v4'


class Wordnik:
    """API client to lookup words in wordnik.com"""

    def __init__(self, api_key, client=Fetcher(WORDNIK_URL)):
        """Constructor to prepare API connection.

        :param api_key: valid API key for wordnik.com
        :param client: client for making a batch of HTTP GET requests
        """
        self.api_key = api_key
        self.client = client

    def lookup(self, word):
        """Lookup a word in online dictionary.

        :param word: word to look up
        :returns: lookup for word
        """
        query = urlencode(OrderedDict([
            ('api_key', self.api_key),
            ('includeRelated', False),
            ('includeTags', False),
            ('limit', 200),
            ('sourceDictionaries', 'wiktionary'),
            ('useCanonical', False),
        ]))
        request_paths = ['/word.json/{}/definitions?{}'.format(word, query)]

        responses = self.client.get(request_paths)
        responses_data = [r.json() for r in responses if r and r.status_code == 200]

        definitions = []
        for response_data in responses_data:
            for entry in response_data:
                definition = WordDefinition(entry['partOfSpeech'], entry['text'])
                definitions.append(definition)

        return WordLookup(word, definitions, ATTRIBUTION)
