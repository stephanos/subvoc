from unittest.mock import Mock
from domain.search import find_movies

from domain.api.model import Media, Subtitle
from domain.api.opensubtitles import OpenSubtitles


def test_find_movies():
    api_mock = Mock(spec=OpenSubtitles)

    movie1 = Media('M1', '1', 'movie', 2000)
    movie2 = Media('M2', '2', 'movie', 2000)
    movie3 = Media('M3', '3', 'movie', 2000)
    api_mock.find_by_query.return_value = [
        Subtitle('S1', movie1,  100, 'UTF-8', False),
        Subtitle('S2', movie1,  500, 'UTF-8', False),
        Subtitle('S3', movie2,  400, 'UTF-8', False),
        Subtitle('S4', movie2,  400, 'UTF-8', False),
        Subtitle('S5', movie3, 1000, 'UTF-8', False)
    ]

    result = find_movies(api_mock, 'a_query', count=2)

    assert result == [movie3, movie2]
