from unittest.mock import MagicMock

from web.routes.api_search import search_api


def test_search_api():
    searcher_mock = MagicMock()
    media1_mock = MagicMock(id='1', title='Movie 1', poster_url='1.png')
    media2_mock = MagicMock(id='2', title='Movie 2', poster_url='2.png')
    searcher_mock.search.return_value = [media1_mock, media2_mock]

    resp = search_api(searcher_mock, 'query')

    assert resp == {
        'hits': [
            {
                'id': '1',
                'title': 'Movie 1',
                'poster_url': '1.png'
            }, {
                'id': '2',
                'title': 'Movie 2',
                'poster_url': '2.png'
            }
        ]
    }
    
    searcher_mock.search.assert_called_once_with('query')
