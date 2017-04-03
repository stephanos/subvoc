from datetime import timedelta as td

from domain.extract import Excerpt, Extractor
from domain.parse import Sentence


def test_exerpt_nearby_sentences():
    sentences = [
        Sentence("Duty calls.", td(seconds=25)),
        Sentence("Gentlemen.", td(seconds=30)),
        Sentence("I'll never understand.", td(seconds=31)),
        Sentence("All these books, a world of knowledge, and what do you do?", td(seconds=32)),
        Sentence("Play poker all night.", td(seconds=33)),
        Sentence("We got culture.", td(seconds=34)),
        Sentence("We got culture coming out our asses.", td(seconds=35)),
        Sentence("How's this for culture?", td(seconds=36)),
        Sentence("Phone.", td(seconds=40))
    ]

    extractor = Extractor(td(seconds=5))
    excerpt = extractor.extract(sentences, 3, 'knowledge')

    assert excerpt == Excerpt([
        sentences[1],
        sentences[2],
        sentences[3],
        sentences[4],
        sentences[5],
        sentences[6],
        sentences[7],
    ], 'knowledge')


def test_exerpt_nearby_sentences_at_end():
    sentences = [
        Sentence("Roads?", td(minutes=90)),
        Sentence("Where we're going we don't need roads.", td(minutes=90))
    ]

    extractor = Extractor(td(seconds=5))
    excerpt = extractor.extract(sentences, 1, 'roads')

    assert excerpt == Excerpt([
        sentences[0],
        sentences[1],
    ], 'roads')


def test_exerpt_nearby_sentences_at_start():
    sentences = [
        Sentence("All right, there are five billion people on earth.", td(seconds=0)),
        Sentence("When I was a kid there were three.", td(seconds=1))
    ]

    extractor = Extractor(td(seconds=5))
    excerpt = extractor.extract(sentences, 0, 'billion')

    assert excerpt == Excerpt([
        sentences[0],
        sentences[1],
    ], 'billion')
