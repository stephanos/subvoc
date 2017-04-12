from domain.tokenizer import Tokenizer


def test_tokenize_sentences():
    text = 'I hoped to see my friend. And shake his hand.'
    sentences = Tokenizer().sentences(text)

    assert list(sentences) == ['I hoped to see my friend.', 'And shake his hand.']


def test_tokenize_words():
    sentences = ['I hoped to see my wonderful friend.', 'And shake his hand firmly.']
    words_by_sentence = list(Tokenizer().words(sentences))

    assert len(words_by_sentence) == 2
    assert list(words_by_sentence[0]) == [
        'I', 'hoped', 'to', 'see', 'my', 'wonderful', 'friend', '.', ]
    assert list(words_by_sentence[1]) == [
        'And', 'shake', 'his', 'hand', 'firmly', '.']
