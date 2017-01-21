from collections import namedtuple


Attribution = namedtuple('Attribution', ['text', 'url'])


class WordDefinition:
    def __init__(self, partOfSpeach, definition):
        self.partOfSpeach = partOfSpeach
        self.definition = definition

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        return not self.__eq__(other)


class WordLookup:
    def __init__(self, token, definitions, attribution):
        self.token = token
        self.definitions = definitions
        self.attribution = attribution

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        return not self.__eq__(other)
