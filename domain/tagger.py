from enum import Enum
from collections import namedtuple

from nltk.tag import SennaTagger


Word = namedtuple('Word', ['token', 'POS'])


class PartOfSpeach(Enum):
    ADJ = 1
    ADV = 2
    NOUN = 3
    VERB = 4
    OTHER = 5


class Tagger:

    def __init__(self):
        self.tagger = SennaTagger('/app/util/senna')

    def tag(self, tokens_in_sentence):
        return ((Word(t, self._parse_POS(POS)) for t, POS in s)
                for s in self.tagger.tag_sents(tokens_in_sentence))

    def _parse_POS(self, tag):
        if tag.startswith('J'):
            return PartOfSpeach.ADJ
        elif tag.startswith('V'):
            return PartOfSpeach.VERB
        elif tag.startswith('N'):
            return PartOfSpeach.NOUN
        elif tag.startswith('R'):
            return PartOfSpeach.ADV
        return PartOfSpeach.OTHER
