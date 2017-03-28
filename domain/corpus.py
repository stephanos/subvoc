CACHE = {}
DATABASES = {
    'full': 'corpora/en.txt',
    'min': 'corpora/en_min.txt',
}


class Corpus:

    def __init__(self, filepath):
        if filepath in CACHE:
            self.freq_lookup = CACHE[filepath]
        else:
            self.freq_lookup = {}
            with open(filepath, 'r') as file:
                for line in file:
                    word, freq = line.split(' ')
                    self.freq_lookup[word] = int(freq)
            CACHE[filepath] = self.freq_lookup

    def freq(self, word):
        return self.freq_lookup.get(word, 0)
