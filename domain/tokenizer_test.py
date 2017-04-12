from domain.tokenizer import Tokenizer


def test_tokenize_sentences():
    text = 'I hoped to see my friend. And shake his hand.'
    sentences = Tokenizer().sentences(text)

    assert list(sentences) == ['I hoped to see my friend.', 'And shake his hand.']


def test_tokenize_words():
    sentence = 'I hoped to see my wonderful friend.'
    words = Tokenizer().words(sentence)

    assert words == ['I', 'hoped', 'to', 'see', 'my', 'wonderful', 'friend', '.']
