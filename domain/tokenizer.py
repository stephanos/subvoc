from nltk.tokenize import sent_tokenize, WordPunctTokenizer


class Tokenizer:
    """Split text into sentence/words."""

    def __init__(self):
        self.tokenizer = WordPunctTokenizer()

    def sentences(self, text):
        """Split a text into sentences.

        :param text: string including sentence(s)
        :return: list of sentences
        """
        return sent_tokenize(text)

    def words(self, sentence):
        """Split a sentence into words.

        :param sentences: a sentence
        :return: list of words
        """
        return self.tokenizer.tokenize(sentence)
