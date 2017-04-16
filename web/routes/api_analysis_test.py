import json
from unittest.mock import MagicMock

from domain.corpus import WordDifficulty
from domain.excerpt import Excerpt
from domain.analyse import Analysis
from domain.parse import Sentence
from domain.tagger import Word, PartOfSpeach
from web.routes.api_analysis import analysis_api


def test_analysis_api():
    analysis = Analysis()
    analysis.add(
        Word('rifle', PartOfSpeach.NOUN),
        Excerpt([
                    Sentence('This is my rifle.', None),
                    Sentence('There are many like it, but this one is mine.', None)
                ], 'rifle'),
        5000, WordDifficulty.EASY)
    analysis.add(
        Word('sympathize', PartOfSpeach.VERB),
        Excerpt([
                    Sentence('Hell, I sympathize.', None),
                    Sentence('I sympathize completely.', None)
                ], 'sympathize'),
        100, WordDifficulty.HARD)
    subtitle = MagicMock(media=MagicMock(id='MOVIE_ID', title='MOVIE_TITLE'))
    analyser_mock = MagicMock()
    analyser_mock.analyse.return_value = (subtitle, analysis)

    poster_api_mock = MagicMock()
    poster_api_mock.get_movie_posters.return_value = {'MOVIE_ID': 'POSTER_URL'}

    resp = analysis_api(analyser_mock, poster_api_mock, 'MOVIE_ID')

    print(str(resp.data))
    assert json.loads(resp.get_data(as_text=True)) == {
        "media": {
            "title": "MOVIE_TITLE",
            "id": "MOVIE_ID",
            "poster_url": "POSTER_URL"
        },
        "words": [
            {
                "byPOS": {
                    "noun": {
                        "excerpts": [
                            {
                                "token": "rifle",
                                "sentences": [
                                    {
                                        "text": "This is my rifle."
                                    },
                                    {
                                        "text": "There are many like it, but this one is mine."
                                    }
                                ]
                            }
                        ],
                        "freq": 1
                    }
                },
                "token": "rifle",
                "difficulty": {
                    "value": 0.9998,
                    "level": 1,
                    "label": "EASY"
                },
                "freq": 1
            },
            {
                "byPOS": {
                    "verb": {
                        "excerpts": [
                            {
                                "token": "sympathize",
                                "sentences": [
                                    {
                                        "text": "Hell, I sympathize."
                                    },
                                    {
                                        "text": "I sympathize completely."
                                    }
                                ]
                            }
                        ],
                        "freq": 1
                    }
                },
                "token": "sympathize",
                "difficulty": {
                    "value": 0.99,
                    "level": 3,
                    "label": "HARD"
                },
                "freq": 1
            }
        ]
    }

    analyser_mock.analyse.assert_called_once_with('MOVIE_ID')
    poster_api_mock.get_movie_posters.assert_called_once_with(['MOVIE_ID'])
