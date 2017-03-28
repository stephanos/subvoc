from datetime import timedelta
from collections import namedtuple


MAX_DELTA = timedelta(seconds=5)

Excerpt = namedtuple('Excerpt', ['sentences', 'token'])


class Extractor:

    @classmethod
    def extract(self, sentences, token_sentence_pos, token):
        token_sentence = sentences[token_sentence_pos]

        sentences_after = self._pick_close_sentences(
            sentences, token_sentence_pos, token_sentence.time, 1)
        sentences_before = list(reversed(self._pick_close_sentences(
            sentences, token_sentence_pos, token_sentence.time, -1)))

        return Excerpt(
            sentences_before + [token_sentence] + sentences_after,
            token)

    @classmethod
    def _pick_close_sentences(self, sentences, token_sentence_pos, start_time, direction):
        picked = []
        i = token_sentence_pos + direction

        while i >= 0 and i < len(sentences) and self._is_close(sentences[i].time, start_time):
            picked.append(sentences[i])
            i += direction

        return picked

    @classmethod
    def _is_close(self, td1, td2):
        return abs(td1 - td2) <= MAX_DELTA
