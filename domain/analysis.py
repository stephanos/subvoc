import collections, nltk, re
from sortedcontainers import SortedSet, SortedDict
from nltk import pos_tag
from nltk.corpus import wordnet
from nltk.tokenize import WordPunctTokenizer
from domain.search import to_movie


WordFreq = collections.namedtuple('WordFreq', 'word freq')


def load_corpus(filepath):
    words_by_freq = SortedDict()
    with open(filepath, 'r') as file:
        for line in file:
            word, freq = line.split(' ')
            words_by_freq[word] = int(freq)
    return words_by_freq

corpus = load_corpus('corpus/en.txt')

def pick_best(subtitles):
    single_subtitles = [s for s in subtitles if s['SubSumCD'] == '1']
    if not single_subtitles:
        return None
    print('found {} single file subtitles'.format(len(single_subtitles)))

    sort_by_dls = lambda s: s.get('SubDownloadsCnt')
    single_subtitles_by_dls = sorted(single_subtitles, key = sort_by_dls)

    subtitle = single_subtitles_by_dls[0]
    return subtitle

def find_subtitle(api, imdb_id):
    all_subtitles = api.find_subtitles_for_movie(imdb_id)
    if not all_subtitles:
        return None
    print('found {} subtitles'.format(len(all_subtitles)))

    subtitle = pick_best(all_subtitles)
    return subtitle

def load_subtitle(api, subtitle):
    subtitle_id = subtitle.get('IDSubtitleFile')
    subtitle_bytes = api.load_subtitle(subtitle_id)
    print('loaded subtitle with ID {}'.format(subtitle_id))

    encoding = subtitle.get('SubEncoding')
    subtitle_text = str(subtitle_bytes, encoding)

    return subtitle_text

def analyse_subtitles(subtitles):
    # TODO transform into tuple (start, end, text)
    word_by_freq = SortedSet(key = lambda x: x.freq)
    tokenizer = WordPunctTokenizer()
    tokens = tokenizer.tokenize(subtitles)
    for token in tokens:
        word = token # todo use lemma
        if word in corpus:
            freq = corpus[word]
            word_by_freq.add(WordFreq(word, freq))
    return list(word_by_freq)


def analyse_movie(api, imdb_id):
    subtitle = find_subtitle(api, imdb_id)
    subtitle_text = load_subtitle(api, subtitle)
    analysis = analyse_subtitles(subtitle_text)
    return {
        'movie': to_movie(subtitle),
        'entries': analysis
    }
