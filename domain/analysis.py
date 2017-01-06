import collections, nltk, re
from sortedcontainers import SortedSet, SortedDict

from nltk import pos_tag
from nltk.corpus import wordnet, stopwords
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.tokenize import WordPunctTokenizer

from domain.freq import get_word_freqs
from domain.parser import parse


lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))
tokenizer = WordPunctTokenizer()
WordFreq = collections.namedtuple('WordFreq', 'word freq')


class Analysis:

    def __init__(self, word_freqs):
        self.word_freqs = word_freqs


def get_wordnet_pos(treebank_tag):
    if treebank_tag.startswith('J'):
        return wordnet.ADJ
    elif treebank_tag.startswith('V'):
        return wordnet.VERB
    elif treebank_tag.startswith('N'):
        return wordnet.NOUN
    elif treebank_tag.startswith('R'):
        return wordnet.ADV
    else:
        return None

def pick_best(subtitles):
    valid_subtitles = [s for s in subtitles if not s.partial and s.format == 'srt']
    if not valid_subtitles:
        return None

    sort_by_dls = lambda s: s.downloads
    valid_subtitles_by_dls = sorted(valid_subtitles, key = sort_by_dls)

    subtitle = valid_subtitles_by_dls[0]
    return subtitle

def find_subtitle(api, imdb_id):
    all_subtitles = api.find_subtitles_for_movie(imdb_id)
    if not all_subtitles:
        return None

    subtitle = pick_best(all_subtitles)
    return subtitle

def analyse_subtitles(text, freq_lookup):
    sentences = parse(text)
    word_by_freq = SortedSet(key = lambda x: x.freq)

    for sentence in sentences:
        tokens = pos_tag(tokenizer.tokenize(sentence.text))

        for token, token_type in tokens:
            if token in stop_words:
                continue

            wordnet_pos = get_wordnet_pos(token_type)
            if wordnet_pos is None:
                continue

            word = lemmatizer.lemmatize(token, pos=wordnet_pos)
            if word not in freq_lookup:
                continue

            freq = freq_lookup[word]
            word_by_freq.add(WordFreq(word, freq))

    return Analysis(list(word_by_freq))


def analyse(api, imdb_id):
    subtitle = find_subtitle(api, imdb_id)
    if not subtitle:
        raise RuntimeError('no subtitle found for movie {}'.format(imdb_id))

    text = api.load_text(subtitle)
    analysis = analyse_subtitles(text, get_word_freqs('corpus/en.txt'))
    return subtitle.media, analysis
