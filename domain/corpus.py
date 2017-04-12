from enum import Enum


CACHE = {}


class WordDifficulty(Enum):
    """Difficulty rating of a word."""

    BASIC = 0
    EASY = 1
    MED = 2
    HARD = 3


class CorpusDatabase:
    FULL = 'corpora/en.txt'
    MIN = 'corpora/en_min.txt'


class Corpus:
    """Database of word frequency in the English language."""

    def __init__(self, filepath):
        if filepath in CACHE:
            self.freq_lookup = CACHE[filepath]
        else:
            self.freq_lookup = {}
            with open(filepath, 'r') as file:
                for line in file:
                    word, freq = line.split(' ')
                    self.freq_lookup[word] = int(freq)
            CACHE[filepath] = self.freq_lookup

    def freq(self, word):
        return self.freq_lookup.get(word, 0)

    @staticmethod
    def to_difficulty(freq):
        """Convert the frequency of a word into a difficulty rating.

        :param freq: a word's frequency in the English language
        :return: difficulty rating
        """
        if freq <= 1000:
            return WordDifficulty.HARD
        elif freq <= 5000:
            return WordDifficulty.MED
        elif freq <= 10000:
            return WordDifficulty.EASY
        return WordDifficulty.BASIC
