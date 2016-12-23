def pick_best(subtitles):
    single_subtitles = [s for s in subtitles if s['SubSumCD'] == '1']
    if not single_subtitles:
        return None
    print('found {} single file subtitles'.format(len(single_subtitles)))

    sort_by_dls = lambda s: s.get('SubDownloadsCnt')
    single_subtitles_by_dls = sorted(single_subtitles, key = sort_by_dls)

    subtitle = single_subtitles_by_dls[0]
    return subtitle


def load_subtitle(api, imdb_id):
    all_subtitles = api.find_subtitles_for_movie(imdb_id)
    if not all_subtitles:
        return None
    print('found {} subtitles'.format(len(all_subtitles)))

    subtitle = pick_best(all_subtitles)
    subtitle_id = subtitle.get('IDSubtitleFile')
    subtitle_bytes = api.load_subtitle(subtitle_id)
    print('loaded subtitle with ID {}'.format(subtitle_id))

    encoding = subtitle.get('SubEncoding')
    subtitle_text = str(subtitle_bytes, encoding)

    return subtitle_text


def analyse_movie(api, imdb_id):
    subtitle_text = load_subtitle(api, imdb_id)
    # TODO

