CACHE = {}
CORPORA = {
    'full': 'corpora/en.txt',
    'min': 'corpora/en_min.txt',
}


def word_freqs(filepath):
    if filepath in CACHE:
        return CACHE[filepath]

    freq_lookup = {}
    with open(filepath, 'r') as file:
        for line in file:
            word, freq = line.split(' ')
            freq_lookup[word] = int(freq)

    CACHE[filepath] = freq_lookup
    return freq_lookup
