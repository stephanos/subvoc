from enum import Enum

from nltk import pos_tag
from nltk.tokenize import sent_tokenize, WordPunctTokenizer


class WordPartOfSpeach(Enum):
    ADJ = 1
    ADV = 2
    NOUN = 3
    VERB = 4
    OTHER = 5


class Tokenizer:

    def __init__(self):
        self.tokenizer = WordPunctTokenizer()

    def sentences(self, text):
        return sent_tokenize(text)

    def words(self, text):
        return ((t, self._parse_POS(POS)) for t, POS in pos_tag(self.tokenizer.tokenize(text)))

    def _parse_POS(self, treebank_tag):
        if treebank_tag.startswith('J'):
            return WordPartOfSpeach.ADJ
        elif treebank_tag.startswith('V'):
            return WordPartOfSpeach.VERB
        elif treebank_tag.startswith('N'):
            return WordPartOfSpeach.NOUN
        elif treebank_tag.startswith('R'):
            return WordPartOfSpeach.ADV
        return WordPartOfSpeach.OTHER
