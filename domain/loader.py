def is_valid_subtitle(s):
    return not s.partial and s.format == 'srt'


def pick_best(subtitles):
    valid_subtitles = [s for s in subtitles if is_valid_subtitle(s)]
    if not valid_subtitles:
        return None

    valid_subtitles_by_dls = sorted(valid_subtitles, key=lambda s: s.downloads)

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
