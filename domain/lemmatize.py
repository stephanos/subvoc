from nltk.corpus import wordnet
from nltk.stem.wordnet import WordNetLemmatizer

from domain.tagger import PartOfSpeach


class Lemmatizer:

    def __init__(self):
        self.wordNetLemmatizer = WordNetLemmatizer()

    def lemmatize(self, word, word_POS):
        wordnet_pos = self._to_wordnet_pos(word_POS)
        if not wordnet_pos:
            return word
        return self.wordNetLemmatizer.lemmatize(word, pos=wordnet_pos)

    def _to_wordnet_pos(self, word_POS):
        if word_POS is PartOfSpeach.ADJ:
            return wordnet.ADJ
        elif word_POS is PartOfSpeach.ADV:
            return wordnet.ADV
        elif word_POS is PartOfSpeach.NOUN:
            return wordnet.NOUN
        elif word_POS is PartOfSpeach.VERB:
            return wordnet.VERB
        return None
