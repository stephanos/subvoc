from domain.tagger import PartOfSpeach, Tagger, Word


def test_tag():
    tokens_in_sentence = [
        ['I', 'hoped', 'to', 'see', 'my', 'wonderful', 'friend', '.', ],
        ['And', 'shake', 'his', 'hand', 'firmly', '.']
    ]
    words_in_sentence = list(Tagger().tag(tokens_in_sentence))

    assert len(words_in_sentence) == 2
    assert list(words_in_sentence[0]) == [
        Word('I', PartOfSpeach.OTHER),
        Word('hoped', PartOfSpeach.VERB),
        Word('to', PartOfSpeach.OTHER),
        Word('see', PartOfSpeach.VERB),
        Word('my',  PartOfSpeach.OTHER),
        Word('wonderful',  PartOfSpeach.ADJ),
        Word('friend', PartOfSpeach.NOUN),
        Word('.', PartOfSpeach.OTHER)]
    assert list(words_in_sentence[1]) == [
        Word('And', PartOfSpeach.OTHER),
        Word('shake', PartOfSpeach.VERB),
        Word('his', PartOfSpeach.OTHER),
        Word('hand', PartOfSpeach.NOUN),
        Word('firmly', PartOfSpeach.ADV),
        Word('.', PartOfSpeach.OTHER)]
