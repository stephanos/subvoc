from domain.api.model import to_model, Media, Subtitle


def test_subtitle_equality():
    assert Subtitle('S1', None, False, 'enc', 1) == Subtitle('S1', None, False, 'enc', 1)
    assert Subtitle('S2', None, False, 'enc', 1) != Subtitle('S1', None, False, 'enc', 1)

def test_media_equality():
    assert Media('M1', 'War and Peace', 'movie', '2000') == Media('M1', 'War and Peace', 'movie', '2000')
    assert Media('M1', 'War and Peace', 'movie', '2000') != Media('M2', 'War and Peace', 'movie', '2000')

def test_to_model():
    input = {
        'IDMovieImdb': 'imdb-id',
        'IDSubtitleFile': 'file-id',
        'MovieKind': 'movie',
        'MovieName': 'name',
        'MovieYear': '1986',
        'Nonsense': 'nonsense',
        'SubSumCD': '1',
        'SubDownloadsCnt': '100',
        'SubEncoding': 'enc'
    }

    result = to_model(input)

    assert result == Subtitle(
        id = 'file-id',
        media = Media(
            id = 'imdb-id',
            kind = 'movie',
            title = 'name',
            year = '1986',
        ),
        partial = False,
        encoding = 'enc',
        downloads = 100,
    )

def test_to_model_for_partial_subtitles():
    input = {
        'SubSumCD': '2',
        'SubDownloadsCnt': '100',
    }

    result = to_model(input)

    assert result.partial == True
