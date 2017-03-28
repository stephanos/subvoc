from datetime import timedelta

from domain.parse import Parser, Sentence


parser = Parser()


def test_parse_simple_sentence():
    assert parser.parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend.
''') == [
        Sentence('I hope to see my friend.', timedelta(minutes=1))
    ]


def test_parse_simple_multiline_sentence():
    assert parser.parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend
and shake his hand.
''') == [
        Sentence('I hope to see my friend and shake his hand.', timedelta(minutes=1))
    ]


def test_parse_two_sentences():
    assert parser.parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend.
And shake his hand!
''') == [
        Sentence('I hope to see my friend.', timedelta(minutes=1)),
        Sentence('And shake his hand!', timedelta(minutes=1))
    ]


def test_parse_two_sentences_across_multiple_lines():
    assert parser.parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend.

2
00:02:00,000 --> 00:02:03,000
And shake his hand.
''') == [
        Sentence('I hope to see my friend.', timedelta(minutes=1)),
        Sentence('And shake his hand.', timedelta(minutes=2))
    ]


def test_parse_sentence_connected_with_ellipsis():
    assert parser.parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend...

2
00:01:00,000 --> 00:01:03,000
and shake his hand.
''') == [
        Sentence('I hope to see my friend and shake his hand.', timedelta(minutes=1))
    ]


def test_parse_sentence_connected_with_ellipses():
    assert parser.parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend...

2
00:01:00,000 --> 00:01:03,000
...and shake his hand.
''') == [Sentence('I hope to see my friend and shake his hand.', timedelta(minutes=1))]


def test_parse_sentences_with_dash():
    assert parser.parse('''\
1
00:01:00,000 --> 00:01:03,000
-I hope to see my friend.
-And shake his hand.
''') == [Sentence('I hope to see my friend.', timedelta(minutes=1)),
         Sentence('And shake his hand.', timedelta(minutes=1))]


def test_parse_sentences_with_dash_and_space():
        assert parser.parse('''\
1
00:01:00,000 --> 00:01:03,000
- I hope to see my friend.
- And shake his hand.
''') == [Sentence('I hope to see my friend.', timedelta(minutes=1)),
         Sentence('And shake his hand.', timedelta(minutes=1))]


def test_parse_sentences_with_html():
        assert parser.parse('''\
1
00:01:00,000 --> 00:01:03,000
<i>I hope to see my friend.</i>
''') == [Sentence('I hope to see my friend.', timedelta(minutes=1))]


def test_parse_full_subtitle_file():
    with open('fixtures/opensubtitles/subtitle/1951992295.txt') as text:
        result = parser.parse(''.join(text.readlines()))
        assert len(result) > 0
