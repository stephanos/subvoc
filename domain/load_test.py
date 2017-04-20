from unittest.mock import MagicMock

from api.subtitle.model import Subtitle
from domain.load import Loader


def test_load():
    subtitles = [
        MagicMock(spec=Subtitle, id='A', encoding='c', format='srt',
                  partial=False, downloads=100, text='<text>'),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value=subtitles)
    api_mock.load_text = MagicMock(return_value='<text>')

    loader = Loader(api_mock)
    s = loader.load('<id>')

    assert s is subtitles[0]
    api_mock.find_subtitles_for_movie.assert_called_with('<id>')
    api_mock.load_text.assert_called_with(subtitles[0].id, subtitles[0].encoding)


def test_load_only_uses_srt_format():
    subtitles = [
        MagicMock(spec=Subtitle, id='A', encoding='c', format='ssa', partial=False, downloads=1000),
        MagicMock(spec=Subtitle, id='B', encoding='c', format='sub', partial=False, downloads=1000),
        MagicMock(spec=Subtitle, id='C', encoding='c', format='srt', partial=False, downloads=1),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value=subtitles)

    loader = Loader(api_mock)
    s = loader.load('<id>')
    assert s is subtitles[2]


def test_load_only_uses_complete_subtitles():
    subtitles = [
        MagicMock(spec=Subtitle, id='A', encoding='c', format='srt', partial=True, downloads=1000),
        MagicMock(spec=Subtitle, id='B', encoding='c', format='srt', partial=True, downloads=1000),
        MagicMock(spec=Subtitle, id='C', encoding='c', format='srt', partial=False, downloads=1),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value=subtitles)

    loader = Loader(api_mock)
    s = loader.load('<id>')
    assert s is subtitles[2]


def test_load_sorts_by_downloads():
    subtitles = [
        MagicMock(spec=Subtitle, id='A', encoding='c', format='srt', partial=False, downloads=1),
        MagicMock(spec=Subtitle, id='B', encoding='c', format='srt', partial=False, downloads=100),
        MagicMock(spec=Subtitle, id='C', encoding='c', format='srt', partial=False, downloads=1000),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value=subtitles)

    loader = Loader(api_mock)
    s = loader.load('<id>')
    assert s is subtitles[2]


def test_load_none_found():
    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value=[])

    loader = Loader(api_mock)
    s = loader.load('<id>')
    assert s is None


def test_load_none_valid():
    invalid_subtitles = [
        MagicMock(spec=Subtitle, id='A', encoding='c', format='ssa', partial=False, downloads=1),
        MagicMock(spec=Subtitle, id='B', encoding='c', format='srt', partial=True, downloads=1),
    ]

    api_mock = MagicMock()
    api_mock.find_subtitles_for_movie = MagicMock(return_value=invalid_subtitles)

    loader = Loader(api_mock)
    s = loader.load('<id>')
    assert s is None
