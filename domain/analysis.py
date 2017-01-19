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


Word = namedtuple('Word', ['token', 'type'])


class WordType(Enum):
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
        self.word_with_freq = {}
        self.word_with_lang_freq = {}
        self.sentences_with_word = defaultdict(list)
        self.ignored_words_with_reason = Counter()

    def count_occurrence(self, word):
        self.word_with_freq.setdefault(word, 0)
        self.word_with_freq[word] += 1

    def add(self, word, sentence, freq):
        self.sentences_with_word[word].append(sentence)
        self.word_with_lang_freq[word] = freq
        self.count_occurrence(word)

    def ignore(self, word, reason):
        self.ignored_words_with_reason[word] = reason
        self.count_occurrence(word)

    def words_by_difficulty(self):
        data = self.word_with_lang_freq
        return ({
            'word': w,
            'sentences': self.sentences_with_word[w],
            'freq': data[w],
        } for w in sorted(data, key=lambda x: data[x]))


def get_word_type(treebank_tag):
    if treebank_tag.startswith('J'):
        return WordType.ADJ
    elif treebank_tag.startswith('V'):
        return WordType.VERB
    elif treebank_tag.startswith('N'):
        return WordType.NOUN
    elif treebank_tag.startswith('R'):
        return WordType.ADV
    return WordType.OTHER


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


def analyse_subtitles(text, freq_lookup):
    analysis = Analysis()

    for sentence in parse(text):
        tokens = pos_tag(TOKENIZER.tokenize(sentence.text))

        for token, token_type in tokens:
            if not token.isalpha():
                continue

            word_type = get_word_type(token_type)
            word = Word(token, word_type)

            if token in STOP_WORDS:
                analysis.ignore(word, WordIgnoreType.STOPWORD)
                continue

            if not is_known(token):
                analysis.ignore(word, WordIgnoreType.UNKNOWN)
                continue

            wordnet_pos = get_wordnet_pos(token_type)
            if wordnet_pos is None:
                analysis.ignore(word, WordIgnoreType.UNKNOWN_TYPE)
                continue

            lemma = LEMMATIZER.lemmatize(token, pos=wordnet_pos)
            if lemma not in freq_lookup:
                analysis.ignore(word, WordIgnoreType.UNKNOWN_FREQ)
                continue

            analysis.add(Word(lemma, word_type), sentence, freq_lookup[lemma])

    return analysis


def analyse(api, imdb_id, freq_db=CORPORA['full'], loader=load):
    subtitle, text = loader(api, imdb_id, 'eng')
    if not subtitle:
        raise RuntimeError('no subtitle found for movie {}'.format(imdb_id))

    analysis = analyse_subtitles(text, get_word_freqs(freq_db))
    return subtitle, analysis
