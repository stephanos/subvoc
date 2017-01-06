from unittest.mock import MagicMock

from domain.api.model import Media, Subtitle
from domain.loader import load


def test_load():
    subtitles = [
        MagicMock(spec=Subtitle, format='srt', partial=False, downloads=100),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value = subtitles)
    api_mock.load_text = MagicMock(return_value = '<text>')

    s, t = load(api_mock, '114369')

    assert s is subtitles[0]
    assert t == '<text>'

    api_mock.find_subtitles_for_movie.assert_called_with('114369')
    api_mock.load_text.assert_called_with(subtitles[0])

def test_load_only_uses_srt_format():
    subtitles = [
        MagicMock(spec=Subtitle, format='ssa', partial=False, downloads=1000),
        MagicMock(spec=Subtitle, format='sub', partial=False, downloads=1000),
        MagicMock(spec=Subtitle, format='srt', partial=False, downloads=1),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value = subtitles)

    s, _ = load(api_mock, '114369')
    assert s is subtitles[2]

def test_load_only_uses_complete_subtitles():
    subtitles = [
        MagicMock(spec=Subtitle, format='srt', partial=True, downloads=1000),
        MagicMock(spec=Subtitle, format='srt', partial=True, downloads=1000),
        MagicMock(spec=Subtitle, format='srt', partial=False, downloads=1),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value = subtitles)

    s, _ = load(api_mock, '114369')
    assert s is subtitles[2]

def test_load_sorts_by_downloads():
    subtitles = [
        MagicMock(spec=Subtitle, format='srt', partial=False, downloads=1),
        MagicMock(spec=Subtitle, format='srt', partial=False, downloads=1000),
        MagicMock(spec=Subtitle, format='srt', partial=False, downloads=100000),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value = subtitles)

    s, _ = load(api_mock, '114369')
    assert s is subtitles[2]

def test_load_none_found():
    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value = [])

    s, t = load(api_mock, '114369')
    assert s is None
    assert t is None

def test_load_none_valid():
    invalid_subtitles = [
        MagicMock(spec=Subtitle, format='ssa', partial=False, downloads=1),
        MagicMock(spec=Subtitle, format='srt', partial=True,  downloads=1),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value = invalid_subtitles)

    s, t = load(api_mock, '114369')
    assert s is None
    assert t is None
