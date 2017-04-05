from nltk.corpus import wordnet
from nltk.stem.wordnet import WordNetLemmatizer

from domain.tokenizer import WordPartOfSpeach


class Lemmatizer:

    def __init__(self):
        self.wordNetLemmatizer = WordNetLemmatizer()

    def lemmatize(self, word, word_POS):
        wordnet_pos = self._to_wordnet_pos(word_POS)
        return self.wordNetLemmatizer.lemmatize(word, pos=wordnet_pos)

    def _to_wordnet_pos(self, word_POS):
        if word_POS is WordPartOfSpeach.ADJ:
            return wordnet.ADJ
        elif word_POS is WordPartOfSpeach.VERB:
            return wordnet.VERB
        elif word_POS is WordPartOfSpeach.NOUN:
            return wordnet.NOUN
        elif word_POS is WordPartOfSpeach.ADV:
            return wordnet.ADV
        return None
