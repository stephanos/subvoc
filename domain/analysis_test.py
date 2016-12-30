from domain.analysis import analyse_subtitles, WordFreq

def test_sort():
    analysis = analyse_subtitles(
'''
1684
02:11:39,473 --> 02:11:42,375
I hoped to see my friend
and shake his hand.

1685
02:11:44,176 --> 02:11:48,071
I hoped the Pacific is as blue
as it has been in my dreams.
''')

    assert analysis == [WordFreq(word='hop', freq=7928),
                        WordFreq(word='shake', freq=20029),
                        WordFreq(word='blue', freq=53435),
                        WordFreq(word='dream', freq=75468),
                        WordFreq(word='hand', freq=161068),
                        WordFreq(word='friend', freq=243502),
                        WordFreq(word='see', freq=1386818)]
