def search_api(searcher, query):
    query = query.strip()
    media = searcher.search(query)
    return {
        'query': query,
        'count': len(media),
        'hits': [
            {
                'id': m.id,
                'title': m.title,
                'poster_url': m.poster_url,
                'has_poster': bool(m.poster_url)
            } for m in media]
    }
