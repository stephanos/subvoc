from api.fixture import load_fixture


def test_load_fixture_exists():
    assert 'moviebackground' in load_fixture('fanart/114369.json')


def test_load_fixture_missing():
    assert load_fixture('nonexisting/114369.json') is None


def test_load_fixture_invalid():
    assert load_fixture('../run.py') is None
