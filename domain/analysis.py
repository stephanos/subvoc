import collections, nltk, re
from sortedcontainers import SortedSet, SortedDict
from nltk import pos_tag
from nltk.corpus import wordnet, stopwords
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.tokenize import WordPunctTokenizer


stop_words = set(stopwords.words('english'))
tokenizer = WordPunctTokenizer()
lemmatizer = WordNetLemmatizer()
WordFreq = collections.namedtuple('WordFreq', 'word freq')

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

def load_corpus(filepath):
    words_by_freq = SortedDict()
    with open(filepath, 'r') as file:
        for line in file:
            word, freq = line.split(' ')
            words_by_freq[word] = int(freq)
    return words_by_freq

corpus = load_corpus('corpus/en.txt')

def pick_best(subtitles):
    single_subtitles = [s for s in subtitles if not s.partial]
    if not single_subtitles:
        return None

    sort_by_dls = lambda s: s.downloads
    single_subtitles_by_dls = sorted(single_subtitles, key = sort_by_dls)

    subtitle = single_subtitles_by_dls[0]
    return subtitle

def find_subtitle(api, imdb_id):
    all_subtitles = api.find_subtitles_for_movie(imdb_id)
    if not all_subtitles:
        return None

    subtitle = pick_best(all_subtitles)
    return subtitle

def analyse_subtitles(subtitle_text):
    # TODO transform into tuple (start, end, text)
    word_by_freq = SortedSet(key = lambda x: x.freq)
    tokens = pos_tag(tokenizer.tokenize(subtitle_text))

    for token, token_type in tokens:
        if token in stop_words:
            continue

        wordnet_pos = get_wordnet_pos(token_type)
        if wordnet_pos is None:
            continue

        word = lemmatizer.lemmatize(token, pos=wordnet_pos)
        if word not in corpus:
            continue

        freq = corpus[word]
        word_by_freq.add(WordFreq(word, freq))

    return list(word_by_freq)


def analyse_movie(api, imdb_id):
    subtitle = find_subtitle(api, imdb_id)
    if not subtitle:
        raise RuntimeError('no subtitle found for movie {}'.format(imdb_id))

    subtitle.text = api.load_text(api, subtitle)
    analysis = analyse_subtitles(subtitle.text)
    return subtitle.media, analysis
