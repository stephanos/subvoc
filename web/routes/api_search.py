def remember_last_query(query, cache={}):
    cache['last_query'] = query
    return cache


def search_api(searcher, query):
    remember_last_query(query)
    media = searcher.search(query)
    return {
        'hits': [
            {
                'id': m.id,
                'title': m.title,
                'poster_url': m.poster_url
            } for m in media]
    }
