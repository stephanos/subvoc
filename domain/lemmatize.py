from nltk.corpus import wordnet
from nltk.stem.wordnet import WordNetLemmatizer


class Lemmatizer:

    def __init__(self):
        self.wordNetLemmatizer = WordNetLemmatizer()

    def lemmatize(self, word, pos):
        wordnet_pos = self._to_wordnet_pos(pos)
        return self.wordNetLemmatizer.lemmatize(word, pos=wordnet_pos)

    def _to_wordnet_pos(self, treebank_tag):
        if treebank_tag.startswith('J'):
            return wordnet.ADJ
        elif treebank_tag.startswith('V'):
            return wordnet.VERB
        elif treebank_tag.startswith('N'):
            return wordnet.NOUN
        elif treebank_tag.startswith('R'):
            return wordnet.ADV
        return None
