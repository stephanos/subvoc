def to_movie(item):
    return {
        'id': item.get('IDMovieImdb'),
        'title': item.get('MovieName'),
        'year': item.get('MovieYear'),
        'kind': item.get('MovieKind'),
    }

def find_movies(api, query):
    data = api.find_by_query(query)
    all_movies = [to_movie(item) for item in data]
    unique_movies = { m['id']: m for m in all_movies }.values()
    return unique_movies
