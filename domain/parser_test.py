from datetime import timedelta
from domain.parser import parse, Sentence


def test_parse_simple_sentence():
    assert parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend.
''') == [
        Sentence('I hope to see my friend.', timedelta(minutes=1))
    ]


def test_parse_simple_multiline_sentence():
    assert parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend
and shake his hand.
''') == [
        Sentence('I hope to see my friend and shake his hand.', timedelta(minutes=1))
    ]


def test_parse_two_sentences():
    assert parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend.
And shake his hand!
''') == [
        Sentence('I hope to see my friend.', timedelta(minutes=1)),
        Sentence('And shake his hand!', timedelta(minutes=1))
    ]


def test_parse_sentences_connected_with_ellipsis():
    assert parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend...

2
00:01:00,000 --> 00:01:03,000
and shake his hand.
''') == [
        Sentence('I hope to see my friend and shake his hand.', timedelta(minutes=1))
    ]


def test_parse_sentences_connected_with_ellipses():
    assert parse('''\
1
00:01:00,000 --> 00:01:03,000
I hope to see my friend...

2
00:01:00,000 --> 00:01:03,000
...and shake his hand.
''') == [Sentence('I hope to see my friend and shake his hand.', timedelta(minutes=1))]


def test_parse_sentences_with_dash():
    assert parse('''\
1
00:01:00,000 --> 00:01:03,000
-I hope to see my friend.
-And shake his hand.
''') == [Sentence('I hope to see my friend.', timedelta(minutes=1)),
         Sentence('And shake his hand.', timedelta(minutes=1))]


def test_parse_sentences_with_dash_and_space():
        assert parse('''\
1
00:01:00,000 --> 00:01:03,000
- I hope to see my friend.
- And shake his hand.
''') == [Sentence('I hope to see my friend.', timedelta(minutes=1)),
         Sentence('And shake his hand.', timedelta(minutes=1))]


def test_parse_sentences_with_html():
        assert parse('''\
1
00:01:00,000 --> 00:01:03,000
<i>I hope to see my friend.</i>
''') == [Sentence('I hope to see my friend.', timedelta(minutes=1))]


def test_parse_full_subtitle_file():
    with open('fixtures/opensubtitles/subtitle/1951992295.txt') as text:
        result = parse(''.join(text.readlines()))
        assert len(result) > 0
