from domain.lemmatize import Lemmatizer
from domain.tokenizer import WordPartOfSpeach


def test_lemmatize_inflected():
    lemmatizer = Lemmatizer()

    assert lemmatizer.lemmatize('bluest', WordPartOfSpeach.ADJ) == 'blue'
    assert lemmatizer.lemmatize('friends', WordPartOfSpeach.NOUN) == 'friend'
    assert lemmatizer.lemmatize('being', WordPartOfSpeach.VERB) == 'be'


def test_do_not_lemmatize_uninflected():
    lemmatizer = Lemmatizer()

    assert lemmatizer.lemmatize('blue', WordPartOfSpeach.ADJ) == 'blue'
    assert lemmatizer.lemmatize('lightly', WordPartOfSpeach.ADV) == 'lightly'
    assert lemmatizer.lemmatize('friend', WordPartOfSpeach.NOUN) == 'friend'
    assert lemmatizer.lemmatize('hope', WordPartOfSpeach.VERB) == 'hope'
