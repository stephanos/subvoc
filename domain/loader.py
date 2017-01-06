def pick_best(subtitles):
    valid_subtitles = [s for s in subtitles if not s.partial and s.format == 'srt']
    if not valid_subtitles:
        return None

    sort_by_dls = lambda s: s.downloads
    valid_subtitles_by_dls = sorted(valid_subtitles, key = sort_by_dls)

    subtitle = valid_subtitles_by_dls[-1]
    return subtitle

def load(api, imdb_id, lang):
    all_subtitles = api.find_subtitles_for_movie(imdb_id, lang)
    if not all_subtitles:
        return None, None

    subtitle = pick_best(all_subtitles)
    if not subtitle:
        return None, None

    text = api.load_text(subtitle)

    return subtitle, text
