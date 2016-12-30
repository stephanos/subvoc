from domain.api.model import Media


def test_media_equality():
    assert Media('M1', 'War and Peace', 'movie', 2000) == Media('M1', 'War & Peace', 'movie',2000)
    assert Media('M1', 'War and Peace', 'movie', 2000) != Media('M2', 'War!', 'movie',2000)

