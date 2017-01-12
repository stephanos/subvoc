from unittest.mock import MagicMock

from api.poster.fanart import FanArt, Fetcher


def test_get_movie_posters():
    fetcher_mock = MagicMock(spec=Fetcher)
    fetcher_mock.get.return_value = [{
        'imdb_id': 'tt0000001',
        'movieposter': [{
            'url': 'http://movieposter.com/fanart/tt0000001/0.png',
        }, {
            'url': 'http://movieposter.com/fanart/tt0000001/1.png',
        }]
    }, {
        'imdb_id': 'tt0000003',
        'movieposter': [{
            'url': 'http://movieposter.com/fanart/tt0000003/0.png',
        }]
    }]

    api = FanArt('api-key', fetcher_mock)
    result = api.get_movie_posters(['tt0000001', 'tt0000002', 'tt0000003'])

    assert result.keys() == set(['tt0000001', 'tt0000003'])


def test_ignore_movies_without_posters():
    fetcher_mock = MagicMock(spec=Fetcher)
    fetcher_mock.get.return_value = [{
        'imdb_id': 'tt0000001',
        'movieposter': []
    }]

    api = FanArt('api-key', fetcher_mock)
    result = api.get_movie_posters(['tt0000001'])

    assert result == {}


def test_use_preview_url():
    fetcher_mock = MagicMock(spec=Fetcher)
    fetcher_mock.get.return_value = [{
        'imdb_id': 'tt0000001',
        'movieposter': [{
            'url': 'http://movieposter.com/fanart/tt0000001/0.png',
        }]
    }]

    api = FanArt('api-key', fetcher_mock)
    result = api.get_movie_posters(['tt0000001'])

    assert result == {
        'tt0000001': 'http://movieposter.com/preview/tt0000001/0.png'
    }
