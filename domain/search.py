from collections import Counter


def search(api, query, count=20):
    subtitles = api.find_by_query(query)

    movie_downloads = Counter()
    movie_by_id = {}
    for s in subtitles:
        if s.media.kind == 'movie':
            media_id = s.media.id
            movie_by_id[media_id] = s.media
            movie_downloads[media_id] += s.downloads

    popular_movies = [movie_by_id[m[0]] for m in movie_downloads.most_common(count)]
    return popular_movies
