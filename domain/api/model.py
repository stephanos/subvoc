class Media:
    def __init__(self, id, title, kind, year):
        self.id = id
        self.title = title
        self.kind = kind
        self.year = year

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        return not self.__eq__(other)


class Subtitle:
    def __init__(self, id, media, downloads, encoding, partial):
        self.id = id
        self.media = media
        self.downloads = downloads
        self.encoding = encoding
        self.partial = partial

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        return not self.__eq__(other)


def to_model(item):
    media = Media(
        id = item.get('IDMovieImdb'),
        title = item.get('MovieName'),
        kind = item.get('MovieKind'),
        year = item.get('MovieYear'),
    )

    return Subtitle(
        id = item.get('IDSubtitleFile'),
        media = media,
        partial = item.get('SubSumCD') != '1',
        encoding = item.get('SubEncoding'),
        downloads = int(item.get('SubDownloadsCnt')),
    )
