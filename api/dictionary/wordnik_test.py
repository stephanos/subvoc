import json
from unittest.mock import MagicMock
from api.test_util import JSONResponse

from api.helper import Fetcher
from api.dictionary.model import Attribution, WordDefinition, WordLookup
from api.dictionary.wordnik import Wordnik


def test_lookup_queries_api():
    fetcher_mock = MagicMock(spec=Fetcher)
    fetcher_mock.get.return_value = [JSONResponse(200, {})]

    api = Wordnik('api-key', fetcher_mock)
    api.lookup('WORD')

    fetcher_mock.get.assert_called_with([
        '/word.json/WORD/definitions?' +
        'api_key=api-key&includeRelated=False&includeTags=False&limit=200&' +
        'sourceDictionaries=wiktionary&useCanonical=False',
    ])


def test_lookup_parses_data():
    with open('fixtures/wordnik/subtitle.definition.json') as resp:
        fetcher_mock = MagicMock(spec=Fetcher)
        fetcher_mock.get.return_value = [JSONResponse(200, json.load(resp))]

        api = Wordnik('api-key', fetcher_mock)
        result = api.lookup('subtitle')

        assert result == WordLookup(
            'subtitle',
            [
                WordDefinition('noun', 'A heading below or after a title.'),
                WordDefinition('noun', 'Textual versions of the dialog in films, ' +
                                       'usually displayed at the bottom of the screen.'),
                WordDefinition('verb', 'To create subtitles for the dialog in a film.'),
            ],
            Attribution('from Wiktionary, CC BY-SA License',
                        'https://creativecommons.org/licenses/by-sa/3.0')
        )
