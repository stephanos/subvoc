def find_movies(api, query):
    subtitles = api.find_by_query(query)
    movies = [s.media for s in subtitles]
    unique_movies = { m.id: m for m in movies }.values()
    return unique_movies
