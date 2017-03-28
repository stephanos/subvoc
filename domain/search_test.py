from unittest.mock import Mock

from api.poster.fanart import FanArt
from api.subtitle.model import Media, Subtitle
from api.subtitle.opensubtitles import OpenSubtitles

from domain.search import Searcher


def test_search():
    poster_api_mock = Mock(spec=FanArt)
    subtitle_api_mock = Mock(spec=OpenSubtitles)

    movie1 = Media('M1', '1', 'movie', 2000)
    movie2 = Media('M2', '2', 'movie', 2000)
    movie3 = Media('M3', '3', 'movie', 2000)

    subtitle_api_mock.find_by_query.return_value = [
        Subtitle('S1', movie1, 'srt', 100, 'UTF-8', False),
        Subtitle('S2', movie1, 'srt', 500, 'UTF-8', False),
        Subtitle('S3', movie2, 'srt', 400, 'UTF-8', False),
        Subtitle('S4', movie2, 'srt', 400, 'UTF-8', False),
        Subtitle('S5', movie3, 'srt', 1000, 'UTF-8', False)
    ]

    poster_api_mock.get_movie_posters.return_value = {
        'M2': '<url>'
    }

    searcher = Searcher(subtitle_api_mock, poster_api_mock)
    result = searcher.search('a_query', count=2)

    assert result == [
        Media('M3', '3', 'movie', 2000),
        Media('M2', '2', 'movie', 2000, '<url>'),
    ]

    poster_api_mock.get_movie_posters.assert_called_once_with(['M3', 'M2'])
