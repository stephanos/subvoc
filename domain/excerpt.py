from datetime import timedelta
from collections import namedtuple


MAX_DELTA = timedelta(seconds=5)

Excerpt = namedtuple('Excerpt', ['sentences', 'token'])


def is_close(td1, td2):
    return abs(td1 - td2) <= MAX_DELTA


def pick_close_sentences(sentences, token_sentence_pos, start_time, direction):
    picked = []
    i = token_sentence_pos + direction

    while i >= 0 and i < len(sentences) and is_close(sentences[i].time, start_time):
        picked.append(sentences[i])
        i += direction

    return picked


def to_excerpt(sentences, token_sentence_pos, token):
    token_sentence = sentences[token_sentence_pos]

    sentences_after = pick_close_sentences(
        sentences, token_sentence_pos, token_sentence.time, 1)
    sentences_before = list(reversed(pick_close_sentences(
        sentences, token_sentence_pos, token_sentence.time, -1)))

    return Excerpt(
        sentences_before + [token_sentence] + sentences_after,
        token)
