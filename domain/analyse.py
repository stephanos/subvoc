from enum import Enum
from collections import defaultdict, namedtuple, Counter

from nltk import pos_tag
from nltk.corpus import wordnet, stopwords
from nltk.tokenize import WordPunctTokenizer

from domain.excerpt import Excerptor
from domain.difficulty import WordDifficulty


STOP_WORDS = set(stopwords.words('english'))
TOKENIZER = WordPunctTokenizer()


Word = namedtuple('Word', ['token', 'POS'])


class WordPartOfSpeach(Enum):
    ADJ = 1
    ADV = 2
    NOUN = 3
    VERB = 4
    OTHER = 5


class WordIgnoreType(Enum):
    STOPWORD = 1
    UNKNOWN = 2
    UNKNOWN_TYPE = 3
    UNKNOWN_FREQ = 4


class Analysis:
    def __init__(self):
        self.least_freq = 1
        self.tokens = set()
        self.token_with_difficulty = {}
        self.token_with_lang_freq = {}
        self.token_with_movie_freq = defaultdict(int)
        self.token_with_POS = defaultdict(set)
        self.word_with_excerpts = defaultdict(list)
        self.word_with_ignore_reason = Counter()
        self.word_with_movie_freq = defaultdict(int)

    def add(self, word, excerpt, freq, diff):
        token = word.token
        self.least_freq = min(freq, self.least_freq)
        self.tokens.add(token)
        self.token_with_difficulty[token] = diff
        self.token_with_lang_freq[token] = freq
        self.token_with_movie_freq[token] += 1
        self.token_with_POS[token].add(word.POS)
        self.word_with_excerpts[word].append(excerpt)
        self.word_with_movie_freq[word] += 1

    def ignore(self, word, excerpt, reason):
        self.tokens.add(word.token)
        self.word_with_ignore_reason[word] = reason
        self.word_with_excerpts[word].append(excerpt)
        self.word_with_movie_freq[word] += 1


def to_word_pos(treebank_tag):
    if treebank_tag.startswith('J'):
        return WordPartOfSpeach.ADJ
    elif treebank_tag.startswith('V'):
        return WordPartOfSpeach.VERB
    elif treebank_tag.startswith('N'):
        return WordPartOfSpeach.NOUN
    elif treebank_tag.startswith('R'):
        return WordPartOfSpeach.ADV
    return WordPartOfSpeach.OTHER


def is_real_word(word):
    return len(wordnet.synsets(word)) != 0


class Analyser:

    def __init__(self, loader, parser, lemmatizer, corpus):
        self.loader = loader
        self.parser = parser
        self.corpus = corpus
        self.lemmatizer = lemmatizer
        self.excerptor = Excerptor()

    def analyse(self, imdb_id):
        subtitle = self.loader.load(imdb_id)
        if not subtitle:
            raise RuntimeError('no subtitle found for movie {}'.format(imdb_id))

        analysis = Analysis()
        sentences = self.parser.parse(subtitle.text)
        for i, sentence in enumerate(sentences):
            tokens = pos_tag(TOKENIZER.tokenize(sentence.text))

            for token, token_tag in tokens:
                if token.lower() == 'subtitle' or not token.isalpha():
                    continue

                excerpt = self.excerptor.excerpt(sentences, i, token)
                POS = to_word_pos(token_tag)
                word = Word(token, POS)

                if token in STOP_WORDS:
                    analysis.ignore(word, excerpt, WordIgnoreType.STOPWORD)
                    continue

                if POS is WordPartOfSpeach.OTHER:
                    analysis.ignore(word, excerpt, WordIgnoreType.UNKNOWN_TYPE)
                    continue

                lemma = self.lemmatizer.lemmatize(token, token_tag)
                if not is_real_word(lemma):
                    analysis.ignore(word, excerpt, WordIgnoreType.UNKNOWN)
                    continue

                lemma_lang_freq = self.corpus.freq(lemma)
                if lemma_lang_freq == 0:
                    analysis.ignore(word, excerpt, WordIgnoreType.UNKNOWN_FREQ)
                    continue

                difficulty = WordDifficulty.to_difficulty(lemma, lemma_lang_freq)
                analysis.add(
                    Word(lemma, POS),
                    excerpt,
                    lemma_lang_freq,
                    difficulty)

        return subtitle, analysis
