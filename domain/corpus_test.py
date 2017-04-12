from domain.corpus import Corpus, CorpusDatabase, WordDifficulty


def test_freq():
    corpus = Corpus(CorpusDatabase.MIN)
    assert corpus.freq('dog') == 98545


def test_to_difficulty():
    assert Corpus.to_difficulty(50000) == WordDifficulty.BASIC
    assert Corpus.to_difficulty(7500) == WordDifficulty.EASY
    assert Corpus.to_difficulty(2500) == WordDifficulty.MED
    assert Corpus.to_difficulty(1) == WordDifficulty.HARD
