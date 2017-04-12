from datetime import timedelta
from collections import namedtuple


DEFAULT_DELTA = timedelta(seconds=7)

Excerpt = namedtuple('Excerpt', ['sentences', 'token'])


class Excerptor:
    """Generate excerpt from around a sentence."""

    def __init__(self, delta=DEFAULT_DELTA):
        self.delta = delta

    def excerpt(self, sentences, token_sentence_pos, token):
        """Return a list of sentences around a pivotal sentence.

        :param sentences: list of sentences
        :param token_sentence_pos: pivotal sentence position
        :param token: token the excerpt is for
        """
        token_sentence = sentences[token_sentence_pos]

        sentences_after = self._pick_close_sentences(
            sentences, token_sentence_pos, token_sentence.time, 1)
        sentences_before = list(reversed(self._pick_close_sentences(
            sentences, token_sentence_pos, token_sentence.time, -1)))

        return Excerpt(
            sentences_before + [token_sentence] + sentences_after,
            token)

    def _pick_close_sentences(self, sentences, token_sentence_pos, start_time, direction):
        picked = []
        i = token_sentence_pos + direction

        while i >= 0 and i < len(sentences) and self._is_close(sentences[i].time, start_time):
            picked.append(sentences[i])
            i += direction

        return picked

    def _is_close(self, td1, td2):
        return abs(td1 - td2) <= self.delta
