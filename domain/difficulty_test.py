from domain.difficulty import WordDifficulty


def test_to_difficulty():
    assert WordDifficulty.to_difficulty(50000) == WordDifficulty.BASIC
    assert WordDifficulty.to_difficulty(7500) == WordDifficulty.EASY
    assert WordDifficulty.to_difficulty(2500) == WordDifficulty.MED
    assert WordDifficulty.to_difficulty(1) == WordDifficulty.HARD
