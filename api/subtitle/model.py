class Media:
    def __init__(self, id, title, kind, year, poster_url=None):
        self.id = id
        self.title = title
        self.kind = kind
        self.year = year
        self.poster_url = poster_url

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        return not self.__eq__(other)


class Subtitle:
    def __init__(self, id, media, format, downloads, encoding, partial, text=None):
        self.id = id
        self.media = media
        self.format = format
        self.downloads = downloads
        self.encoding = encoding
        self.partial = partial
        self.text = text

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        return not self.__eq__(other)


def toImdbID(id):
    if id is None:
        return None
    return 'tt' + id.zfill(7)


def to_model(item):
    media = Media(
        id=toImdbID(item.get('IDMovieImdb')),
        title=item.get('MovieName'),
        kind=item.get('MovieKind'),
        year=item.get('MovieYear'),
    )

    return Subtitle(
        id=item.get('IDSubtitleFile'),
        media=media,
        format=item.get('SubFormat'),
        partial=item.get('SubSumCD') != '1',
        encoding=item.get('SubEncoding'),
        downloads=int(item.get('SubDownloadsCnt')),
    )
