from unittest.mock import MagicMock

from domain.analysis import analyse, CORPORA, Word, WordType, WordIgnoreType


api_mock = MagicMock()
media_mock = MagicMock()
subtitle_mock = MagicMock(media=media_mock)


def test_analysis_yields_frequencies():
    text = '''\
1
02:11:39,473 --> 02:11:42,375
I hoped to see my friend
and shake his hand.

2
02:11:44,176 --> 02:11:48,071
I hoped the Pacific is as blue
as it has been in my dreams.
'''
    loader_mock = MagicMock(return_value=(subtitle_mock, text))
    _, analysis = analyse(api_mock, '<id>', CORPORA['min'], loader_mock)

    assert list(analysis.words_by_difficulty()) == [
        {'word': Word('hop', WordType.VERB), 'freq': 7928},
        {'word': Word('shake', WordType.VERB), 'freq': 20029},
        {'word': Word('blue', WordType.ADJ), 'freq': 53435},
        {'word': Word('dream', WordType.NOUN), 'freq': 75468},
        {'word': Word('hand', WordType.NOUN), 'freq': 161068},
        {'word': Word('friend', WordType.NOUN), 'freq': 243502},
        {'word': Word('see', WordType.VERB), 'freq': 1386818},
    ]


def test_analysis_yields_subtitle():
    text = '''\
1
00:01:00,000 --> 00:01:03,000
I hoped to see my friend
and shake his hand.
'''
    loader_mock = MagicMock(return_value=(subtitle_mock, text))
    subtitle, _ = analyse(api_mock, '<id>', CORPORA['min'], loader_mock)

    assert subtitle == subtitle_mock
    loader_mock.assert_called_with(api_mock, '<id>', 'eng')


def test_analysis_ignores_stopwords():
    text = '''\
1
00:01:00,000 --> 00:01:03,000
I hoped to see my friend
and shake his hand.
'''
    loader_mock = MagicMock(return_value=(subtitle_mock, text))
    _, analysis = analyse(api_mock, '<id>', CORPORA['min'], loader_mock)

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
    loader_mock = MagicMock(return_value=(subtitle_mock, text))
    _, analysis = analyse(api_mock, '<id>', CORPORA['min'], loader_mock)

    unknown_word = Word('weirdnonsenseword', WordType.NOUN)
    assert unknown_word in analysis.ignored_words_with_reason
    assert analysis.ignored_words_with_reason[unknown_word] == WordIgnoreType.UNKNOWN


def test_analysis_ignores_words_with_unknown_frequency():
    text = '''\
1
00:01:00,000 --> 00:01:03,000
I hoped to see my friend
and shake his moustache.
'''
    loader_mock = MagicMock(return_value=(subtitle_mock, text))
    _, analysis = analyse(api_mock, '<id>', CORPORA['min'], loader_mock)

    unknown_freq_word = Word('moustache', WordType.NOUN)
    assert unknown_freq_word in analysis.ignored_words_with_reason
    assert analysis.ignored_words_with_reason[unknown_freq_word] == WordIgnoreType.UNKNOWN_FREQ
