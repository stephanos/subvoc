from collections import Counter


class Searcher:

    def __init__(self, subtitle_api, poster_api):
        self.subtitle_api = subtitle_api
        self.poster_api = poster_api

    def search(self, query, count=10):
        subtitles = self.subtitle_api.find_by_query(query)

        movie_downloads = Counter()
        movie_by_id = {}
        for s in subtitles:
            if s.media.kind == 'movie':
                media_id = s.media.id
                movie_by_id[media_id] = s.media
                movie_downloads[media_id] += s.downloads

        most_popular_movies = [movie_by_id[m[0]] for m in movie_downloads.most_common(count)]
        self._add_posters(most_popular_movies)
        return most_popular_movies

    def _add_posters(self, movies):
        posters = self.poster_api.get_movie_posters([m.id for m in movies])
        for movie in movies:
            movie.poster_url = posters.get(movie.id, None)
