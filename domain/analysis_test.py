import pytest
from unittest.mock import MagicMock

from domain.analysis import analyse, CORPORA, Word, WordType, WordIgnoreType


cache = {}
api_mock = MagicMock()
media_mock = MagicMock()
subtitle_mock = MagicMock(media=media_mock)


def cached_analyse(text):
    if text in cache:
        return cache[text]

    loader_mock = MagicMock(return_value=(subtitle_mock, text))
    result = analyse(api_mock, '<id>', CORPORA['min'], loader_mock)
    loader_mock.assert_called_with(api_mock, '<id>', 'eng')

    cache[text] = result
    return result


def test_analysis_yields_lang_frequencies():
    text = '''\
1
02:11:39,473 --> 02:11:42,375
I hoped to see my friend
and shake his hand.
'''
    _, analysis = cached_analyse(text)

    assert dict(analysis.word_with_lang_freq) == {
        Word('friend', WordType.NOUN): 243502,
        Word('hand', WordType.NOUN): 161068,
        Word('hop', WordType.VERB): 7928,
        Word('see', WordType.VERB): 1386818,
        Word('shake', WordType.VERB): 20029
    }


def test_analysis_yields_movie_frequencies():
    text = '''\
1
02:11:39,473 --> 02:11:42,375
I hoped to see my friend
and shake his hand.
'''
    _, analysis = cached_analyse(text)

    assert dict(analysis.word_with_freq) == {
        Word('I', WordType.OTHER): 1,
        Word('and', WordType.OTHER): 1,
        Word('friend', WordType.NOUN): 1,
        Word('hand', WordType.NOUN): 1,
        Word('his', WordType.OTHER): 1,
        Word('hop', WordType.VERB): 1,
        Word('my', WordType.OTHER): 1,
        Word('see', WordType.VERB): 1,
        Word('shake', WordType.VERB): 1,
        Word('to', WordType.OTHER): 1
    }


def test_analysis_yields_subtitle():
    text = '''\
1
00:01:00,000 --> 00:01:03,000
I hoped to see my friend
and shake his hand.
'''
    subtitle, _ = cached_analyse(text)
    assert subtitle == subtitle_mock


def test_analysis_ignores_stopwords():
    text = '''\
1
00:01:00,000 --> 00:01:03,000
I hoped to see my friend
and shake his hand.
'''
    _, analysis = cached_analyse(text)

    expected_stopwords = set(['and', 'to', 'his', 'my'])
    actual_stopwords = set(w.token for w, r in analysis.ignored_words_with_reason.items()
                           if r == WordIgnoreType.STOPWORD)
    assert actual_stopwords == expected_stopwords

    words = set(w.token for w, _ in analysis.word_with_lang_freq.items())
    assert len(words) == len(words - expected_stopwords)


def test_analysis_ignores_unknown_words():
    text = '''\
1
00:01:00,000 --> 00:01:03,000
I hoped to see my friend
and shake his weirdnonsenseword.
'''
    _, analysis = cached_analyse(text)

    unknown_word = Word('weirdnonsenseword', WordType.NOUN)
    assert unknown_word in analysis.ignored_words_with_reason
    assert analysis.ignored_words_with_reason[unknown_word] == WordIgnoreType.UNKNOWN


def test_analysis_skips_word_subtitle_entirely():
    text = '''\
1
00:01:00,000 --> 00:01:03,000
Subtitle ... subtitle ... SUBTITLE!
'''
    _, analysis = cached_analyse(text)

    assert not analysis.ignored_words_with_reason
    assert not analysis.word_with_lang_freq


def test_analysis_skips_non_words_entirely():
    text = '''\
1
00:01:00,000 --> 00:01:03,000
42! test0.
'''
    _, analysis = cached_analyse(text)

    assert not analysis.ignored_words_with_reason
    assert not analysis.word_with_lang_freq


def test_analysis_ignores_words_with_unknown_frequency():
    text = '''\
1
00:01:00,000 --> 00:01:03,000
I hoped to see my friend
and shake his moustache.
'''
    _, analysis = cached_analyse(text)

    unknown_freq_word = Word('moustache', WordType.NOUN)
    assert unknown_freq_word in analysis.ignored_words_with_reason
    assert analysis.ignored_words_with_reason[unknown_freq_word] == WordIgnoreType.UNKNOWN_FREQ


def test_analysis_fails_when_no_subtitle():
    with pytest.raises(RuntimeError, message='no subtitle found for movie <id>'):
        loader_mock = MagicMock(return_value=(None, None))
        analyse(None, '<id>', None, loader_mock)
