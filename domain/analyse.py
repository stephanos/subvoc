from enum import Enum
from collections import defaultdict, Counter

from nltk.corpus import wordnet, stopwords

from domain.excerpt import Excerptor
from domain.lemmatize import Lemmatizer
from domain.tagger import Tagger, Word, PartOfSpeach
from domain.tokenizer import Tokenizer


class WordIgnoreType(Enum):
    STOPWORD = 1
    UNKNOWN = 2
    UNKNOWN_TYPE = 3
    UNKNOWN_FREQ = 4


class Analysis:
    """Report of words and their difficulty in a movie."""

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

    def add(self, word, excerpt, freq, difficulty):
        """Add a word with meta data to the report."""
        token = word.token
        self.least_freq = min(freq, self.least_freq)
        self.tokens.add(token)
        self.token_with_difficulty[token] = difficulty
        self.token_with_lang_freq[token] = freq
        self.token_with_movie_freq[token] += 1
        self.token_with_POS[token].add(word.POS)
        self.word_with_excerpts[word].append(excerpt)
        self.word_with_movie_freq[word] += 1

    def ignore(self, word, excerpt, reason):
        """Add an ignored word to the report."""
        self.tokens.add(word.token)
        self.word_with_ignore_reason[word] = reason
        self.word_with_excerpts[word].append(excerpt)
        self.word_with_movie_freq[word] += 1


def is_real_word(word):
    return len(wordnet.synsets(word)) != 0


class Analyser:
    """Generate analysis report for a movie."""

    def __init__(self, loader, parser, corpus):
        self.loader = loader
        self.parser = parser
        self.corpus = corpus
        self.tagger = Tagger()
        self.excerptor = Excerptor()
        self.lemmatizer = Lemmatizer()
        self.tokenizer = Tokenizer()
        self.stop_words = set(stopwords.words('english'))

    def analyse(self, imdb_id):
        """Generate analysis report for a movie.

        :param imdb_id: IMDb ID of movie
        :return: analysis
        """

        subtitle = self.loader.load(imdb_id)
        if not subtitle:
            raise RuntimeError('no subtitle found for movie {}'.format(imdb_id))

        analysis = Analysis()
        sentences = self.parser.parse(subtitle.text)
        tokens_in_sentences = (self.tokenizer.words(s.text) for s in sentences)
        words_in_sentences = self.tagger.tag(list(tokens_in_sentences))

        for i, words in enumerate(words_in_sentences):
            for word in words:
                token, token_POS = word

                if token.lower() == 'subtitle' or not token.isalpha():
                    continue

                excerpt = self.excerptor.excerpt(sentences, i, token)

                if token in self.stop_words:
                    analysis.ignore(word, excerpt, WordIgnoreType.STOPWORD)
                    continue

                if token_POS is PartOfSpeach.OTHER:
                    analysis.ignore(word, excerpt, WordIgnoreType.UNKNOWN_TYPE)
                    continue

                lemma = self.lemmatizer.lemmatize(token, token_POS)
                if not is_real_word(lemma):
                    analysis.ignore(word, excerpt, WordIgnoreType.UNKNOWN)
                    continue

                lemma_lang_freq = self.corpus.freq(lemma)
                if lemma_lang_freq == 0:
                    analysis.ignore(word, excerpt, WordIgnoreType.UNKNOWN_FREQ)
                    continue

                difficulty = self.corpus.to_difficulty(lemma_lang_freq)
                analysis.add(
                    Word(lemma, token_POS),
                    excerpt,
                    lemma_lang_freq,
                    difficulty)

        return subtitle, analysis
