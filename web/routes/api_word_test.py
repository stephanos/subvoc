from unittest.mock import MagicMock

from api.dictionary.model import Attribution, WordLookup, WordDefinition
from api.dictionary.wordnik import Wordnik
from web.routes.api_word import words_api


def test_words_api():
    api_mock = MagicMock(spec=Wordnik)
    api_mock.lookup.return_value = \
        WordLookup(
            'word', [
                WordDefinition('noun', 'noun definition1'),
                WordDefinition('noun', 'noun definition2'),
                WordDefinition('verb', 'verb definition'),
            ],
            Attribution('text', 'url'))

    data = words_api(api_mock, 'word')

    assert data == {
        "attribution": {
            "text": "text",
            "url": "url"
        },
        "noun": [{
                "definition": "noun definition1"
            }, {
                "definition": "noun definition2"
            }],
        "verb": [{
            "definition": "verb definition"
        }]
    }

    api_mock.lookup.assert_called_once_with('word')
