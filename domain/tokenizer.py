from enum import Enum

from nltk.tag import SennaTagger
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
        self.tagger = SennaTagger('/app/util/senna')

    def sentences(self, text):
        return sent_tokenize(text)

    def words(self, list_sentences):
        list_sentences_words = [self.tokenizer.tokenize(s) for s in list_sentences]
        return (((t, self._parse_POS(POS)) for t, POS in s)
                for s in self.tagger.tag_sents(list_sentences_words))

    def _parse_POS(self, tag):
        if tag.startswith('J'):
            return WordPartOfSpeach.ADJ
        elif tag.startswith('V'):
            return WordPartOfSpeach.VERB
        elif tag.startswith('N'):
            return WordPartOfSpeach.NOUN
        elif tag.startswith('R'):
            return WordPartOfSpeach.ADV
        return WordPartOfSpeach.OTHER
