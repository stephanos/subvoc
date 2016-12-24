from domain.subtitle import Subtitle


def parse(item):
    return Subtitle(
        id = item.get('IDMovieImdb'),
        title = item.get('MovieName'),
        year = item.get('MovieYear'),
        downloads = item.get('SubDownloadsCnt'),
    )

def find_movies(api, query):
    data = api.find_by_query(query)
    subtitles = map(parse, data)
    unique_movies = { m.id: m for m in subtitles }.values()
    return unique_movies
