from nltk.tokenize import sent_tokenize, WordPunctTokenizer


class Tokenizer:

    def __init__(self):
        self.tokenizer = WordPunctTokenizer()

    def sentences(self, text):
        return sent_tokenize(text)

    def words(self, list_sentences):
        return (self.tokenizer.tokenize(s) for s in list_sentences)