from enum import Enum
from collections import defaultdict, namedtuple, Counter

from nltk import pos_tag
from nltk.corpus import wordnet, stopwords
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.tokenize import WordPunctTokenizer

from domain.freq import get_word_freqs
from domain.loader import load
from domain.parser import parse


CORPORA = {
    'full': 'corpora/en.txt',
    'min': 'corpora/en_min.txt',
}
LEMMATIZER = WordNetLemmatizer()
STOP_WORDS = set(stopwords.words('english'))
TOKENIZER = WordPunctTokenizer()


Excerpt = namedtuple('Excerpt', ['sentences', 'token'])
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


class WordDifficulty(Enum):
    BASIC = 0
    EASY = 1
    MED = 2
    HARD = 3


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


def get_word_pos(treebank_tag):
    if treebank_tag.startswith('J'):
        return WordPartOfSpeach.ADJ
    elif treebank_tag.startswith('V'):
        return WordPartOfSpeach.VERB
    elif treebank_tag.startswith('N'):
        return WordPartOfSpeach.NOUN
    elif treebank_tag.startswith('R'):
        return WordPartOfSpeach.ADV
    return WordPartOfSpeach.OTHER


def get_wordnet_pos(treebank_tag):
    if treebank_tag.startswith('J'):
        return wordnet.ADJ
    elif treebank_tag.startswith('V'):
        return wordnet.VERB
    elif treebank_tag.startswith('N'):
        return wordnet.NOUN
    elif treebank_tag.startswith('R'):
        return wordnet.ADV
    return None


def is_known(word):
    return len(wordnet.synsets(word)) != 0


def get_difficulty(word, freq):
    if freq <= 1000:
        return WordDifficulty.HARD
    elif freq <= 5000:
        return WordDifficulty.MED
    elif freq <= 10000:
        return WordDifficulty.EASY
    return WordDifficulty.BASIC


def analyse_subtitles(text, freq_lookup):
    analysis = Analysis()

    for sentence in parse(text):
        tokens = pos_tag(TOKENIZER.tokenize(sentence.text))

        for token, token_tag in tokens:
            if token.lower() == 'subtitle' or not token.isalpha():
                continue

            excerpt = Excerpt([sentence], token)
            POS = get_word_pos(token_tag)
            word = Word(token, POS)

            if token in STOP_WORDS:
                analysis.ignore(word, excerpt, WordIgnoreType.STOPWORD)
                continue

            if not is_known(token):
                analysis.ignore(word, excerpt, WordIgnoreType.UNKNOWN)
                continue

            wordnet_POS = get_wordnet_pos(token_tag)
            if wordnet_POS is None:
                analysis.ignore(word, excerpt, WordIgnoreType.UNKNOWN_TYPE)
                continue

            lemma = LEMMATIZER.lemmatize(token, pos=wordnet_POS)
            if lemma not in freq_lookup:
                analysis.ignore(word, excerpt, WordIgnoreType.UNKNOWN_FREQ)
                continue

            freq = freq_lookup[lemma]
            analysis.add(
                Word(lemma, POS),
                excerpt,
                freq,
                get_difficulty(lemma, freq))

    return analysis


def analyse(api, imdb_id, freq_db=CORPORA['full'], loader=load):
    subtitle, text = loader(api, imdb_id, 'eng')
    if not subtitle:
        raise RuntimeError('no subtitle found for movie {}'.format(imdb_id))

    analysis = analyse_subtitles(text, get_word_freqs(freq_db))
    return subtitle, analysis
