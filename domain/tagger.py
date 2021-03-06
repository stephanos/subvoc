from enum import Enum
from collections import namedtuple

from nltk.tag import SennaTagger


Word = namedtuple('Word', ['token', 'POS'])


class PartOfSpeach(Enum):
    """A word's part of speech in a sentence."""

    ADJECTIVE = 1
    ADVERB = 2
    NOUN = 3
    VERB = 4
    OTHER = 5


class Tagger:
    """Tag words' part of speech in sentences."""

    def __init__(self):
        self.tagger = SennaTagger('/app/util/senna')

    def tag(self, tokens_in_sentence):
        """Tag tokens in sentences with their part of speech.

        :param tokens_in_sentence: list of tokens, grouped by sentence.
        :return: iterator of lists with words.
        """
        return ((Word(t, self._parse_POS(POS)) for t, POS in s)
                for s in self.tagger.tag_sents(tokens_in_sentence))

    def _parse_POS(self, tag):
        if tag.startswith('J'):
            return PartOfSpeach.ADJECTIVE
        elif tag.startswith('V'):
            return PartOfSpeach.VERB
        elif tag.startswith('N'):
            return PartOfSpeach.NOUN
        elif tag.startswith('R'):
            return PartOfSpeach.ADVERB
        return PartOfSpeach.OTHER
