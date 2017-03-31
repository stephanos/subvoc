from enum import Enum


class WordDifficulty(Enum):
    BASIC = 0
    EASY = 1
    MED = 2
    HARD = 3

    @staticmethod
    def to_difficulty(word, freq):
        if freq <= 1000:
            return WordDifficulty.HARD
        elif freq <= 5000:
            return WordDifficulty.MED
        elif freq <= 10000:
            return WordDifficulty.EASY
        return WordDifficulty.BASIC
