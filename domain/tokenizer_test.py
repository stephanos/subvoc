from domain.tokenizer import Tokenizer, WordPartOfSpeach


def test_tokenize_sentences():
    text = 'I hoped to see my friend. And shake his hand.'
    sentences = Tokenizer().sentences(text)

    assert list(sentences) == ['I hoped to see my friend.', 'And shake his hand.']


def test_tokenize_words():
    sentences = ['I hoped to see my friend.', 'And shake his hand.']
    words_by_sentence = list(Tokenizer().words(sentences))

    assert len(words_by_sentence) == 2
    assert list(words_by_sentence[0]) == [
        ('I', WordPartOfSpeach.OTHER),
        ('hoped', WordPartOfSpeach.VERB),
        ('to', WordPartOfSpeach.OTHER),
        ('see', WordPartOfSpeach.VERB),
        ('my',  WordPartOfSpeach.OTHER),
        ('friend', WordPartOfSpeach.NOUN),
        ('.', WordPartOfSpeach.OTHER)]
    assert list(words_by_sentence[1]) == [
        ('And', WordPartOfSpeach.OTHER),
        ('shake', WordPartOfSpeach.VERB),
        ('his', WordPartOfSpeach.OTHER),
        ('hand', WordPartOfSpeach.NOUN),
        ('.', WordPartOfSpeach.OTHER)]
