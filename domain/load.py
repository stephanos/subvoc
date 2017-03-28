SUPPORTED_SUBTITLE_FORMAT = 'srt'


class Loader:

    def __init__(self, subtitle_api):
        self.api = subtitle_api

    def load(self, imdb_id):
        all_subtitles = self.api.find_subtitles_for_movie(imdb_id)
        if not all_subtitles:
            return None

        subtitle = self._pick_best_subtitle(all_subtitles)
        if not subtitle:
            return None

        subtitle.text = self.api.load_text(subtitle)
        return subtitle

    def _pick_best_subtitle(self, subtitles):
        valid_subtitles = [s for s in subtitles if self._is_valid_subtitle(s)]
        if not valid_subtitles:
            return None

        valid_subtitles_by_dls = sorted(valid_subtitles, key=lambda s: s.downloads)
        valid_subtitles_with_most_dls = valid_subtitles_by_dls[-1]
        return valid_subtitles_with_most_dls

    def _is_valid_subtitle(self, s):
        return not s.partial and \
            s.format == SUPPORTED_SUBTITLE_FORMAT
