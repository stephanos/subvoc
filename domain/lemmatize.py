from nltk.corpus import wordnet
from nltk.stem.wordnet import WordNetLemmatizer

from domain.tagger import PartOfSpeach


class Lemmatizer:
    """Determine a word's uninflected form, its lemma.

    For example, lemma of 'dogs' is 'dog, of 'faster' is 'fast'.
    The algorithm is based on the word's part of speech in a sentence.
    """

    def __init__(self):
        self.wordNetLemmatizer = WordNetLemmatizer()

    def lemmatize(self, token, token_POS):
        """Return token's uninflected form.

        :param token: inflected word
        :param POS: word's part of speech
        """
        wordnet_pos = self._to_wordnet_pos(token_POS)
        if not wordnet_pos:
            return token
        return self.wordNetLemmatizer.lemmatize(token, pos=wordnet_pos)

    def _to_wordnet_pos(self, token_POS):
        if token_POS is PartOfSpeach.ADJECTIVE:
            return wordnet.ADJ
        elif token_POS is PartOfSpeach.ADVERB:
            return wordnet.ADV
        elif token_POS is PartOfSpeach.NOUN:
            return wordnet.NOUN
        elif token_POS is PartOfSpeach.VERB:
            return wordnet.VERB
        return None
