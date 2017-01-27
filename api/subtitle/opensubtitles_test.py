import json
import pytest
from unittest.mock import MagicMock

from api.subtitle.model import Subtitle
from api.subtitle.opensubtitles import OpenSubtitles


successful_login_resp = {'status': '200 OK', 'token': 'my-token'}


@pytest.fixture(scope="function")
def api():
    client = MagicMock()

    def create_client():
        return client
    return client, OpenSubtitles(('name', 'pass'), create_client)


def test_login(api):
    client, openSubtitles = api
    client.LogIn = MagicMock(return_value={
        'status': '200 OK',
        'token': 'my-token',
    })

    openSubtitles.login()

    assert openSubtitles.token == 'my-token'
    client.LogIn.assert_called_with('name', 'pass', 'en', 'subvoc v1.0')


def test_login_fail(api):
    with pytest.raises(RuntimeError, message='received status 401 Unauthorized'):
        client, openSubtitles = api
        client.LogIn = MagicMock(return_value={
            'status': '401 Unauthorized',
        })

        openSubtitles.login()


def test_find_by_query(api):
    with open('fixtures/opensubtitles/query/se7en.json') as resp:
        client, openSubtitles = api
        client.LogIn = MagicMock(return_value=successful_login_resp)
        client.SearchSubtitles = MagicMock(return_value=json.load(resp))

        result = openSubtitles.find_by_query('movie name')

        assert len(result) == 78
        assert isinstance(result[0], Subtitle)
        assert result[0].media.id == 'tt0114369'

        client.SearchSubtitles.assert_called_with('my-token', [{
            'query': 'movie name',
            'sublanguageid': 'eng',
        }], [{'limit': 500}])


def test_find_subtitles_for_movie(api):
    with open('fixtures/opensubtitles/id/tt0114369.json') as resp:
        client, openSubtitles = api
        client.LogIn = MagicMock(return_value=successful_login_resp)
        client.SearchSubtitles = MagicMock(return_value=json.load(resp))

        result = openSubtitles.find_subtitles_for_movie('114369', 'eng')

        assert len(result) == 64
        assert isinstance(result[0], Subtitle)
        assert result[0].media.id == 'tt0114369'

        client.SearchSubtitles.assert_called_with('my-token', [{
            'imdbid': '114369',
            'sublanguageid': 'eng',
        }], [{'limit': 500}])


def test_load_text(api):
    with open('fixtures/opensubtitles/subtitle/1951992295.json') as resp:
        client, openSubtitles = api
        client.LogIn = MagicMock(return_value=successful_login_resp)
        client.DownloadSubtitles = MagicMock(return_value=json.load(resp))

        subtitle = Subtitle('my-subtitle', None, 'srt', 0, 'CP1252', False)
        result = openSubtitles.load_text(subtitle)

        assert isinstance(result, str)
        assert len(result) == 101014
        assert result[:66] == '''\
1
00:00:59,085 --> 00:01:03,021
They were heard screaming at each
'''
        assert "don't" in result  # test for special characters

        client.DownloadSubtitles.assert_called_with('my-token', ['my-subtitle'])
