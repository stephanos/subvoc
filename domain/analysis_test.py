from domain.analysis import analyse_subtitles, WordFreq

def test_sort():
    assert analyse_subtitles(
'''
83
00:06:49,765 --> 00:06:53,060
I can honestly say
that I'm a changed man.
''') == [
    WordFreq(word='honestly',   freq=23429),
    WordFreq(word='m',          freq=43966),
    WordFreq(word='changed',    freq=67059),
    WordFreq(word='say',        freq=901201),
    WordFreq(word='man',        freq=910369),
    WordFreq(word='can',        freq=2974080),
    WordFreq(word='that',       freq=7789269),
    WordFreq(word='a',          freq=11230036)
]
