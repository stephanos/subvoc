from domain.lemmatize import Lemmatizer
from domain.tagger import PartOfSpeach


def test_lemmatize_inflected():
    lemmatizer = Lemmatizer()

    assert lemmatizer.lemmatize('bluest', PartOfSpeach.ADJ) == 'blue'
    assert lemmatizer.lemmatize('friends', PartOfSpeach.NOUN) == 'friend'
    assert lemmatizer.lemmatize('being', PartOfSpeach.VERB) == 'be'


def test_do_not_lemmatize_uninflected():
    lemmatizer = Lemmatizer()

    assert lemmatizer.lemmatize('blue', PartOfSpeach.ADJ) == 'blue'
    assert lemmatizer.lemmatize('lightly', PartOfSpeach.ADV) == 'lightly'
    assert lemmatizer.lemmatize('friend', PartOfSpeach.NOUN) == 'friend'
    assert lemmatizer.lemmatize('hope', PartOfSpeach.VERB) == 'hope'
    assert lemmatizer.lemmatize('and', PartOfSpeach.OTHER) == 'and'
