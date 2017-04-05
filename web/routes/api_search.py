def search_api(searcher, query):
    media = searcher.search(query)
    return {
        'hits': [
            {
                'id': m.id,
                'title': m.title,
                'poster_url': m.poster_url
            } for m in media]
    }
