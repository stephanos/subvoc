from sortedcontainers import SortedDict


cache = {}

def get_word_freqs(filepath):
    if filepath in cache:
        return cache[filepath]

    freq_lookup = SortedDict()
    with open(filepath, 'r') as file:
        for line in file:
            word, freq = line.split(' ')
            freq_lookup[word] = int(freq)

    cache[filepath] = freq_lookup
    return freq_lookup
