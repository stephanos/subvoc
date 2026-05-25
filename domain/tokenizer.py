from nltk.tokenize import sent_tokenize, WordPunctTokenizer


class Tokenizer:
    """Split text into sentence/words."""

    def __init__(self, lowercase=False):
        self.tokenizer = WordPunctTokenizer()
        self.lowercase = lowercase

    def sentences(self, text):
        """Split a text into sentences.

        :param text: string including sentence(s)
        :return: list of sentences
        """
        text = text.strip()
        return sent_tokenize(text)

    def words(self, sentence):
        """Split a sentence into words.

        :param sentences: a sentence
        :return: list of words
        """
        words = self.tokenizer.tokenize(sentence)
        if self.lowercase:
            words = [w.lower() for w in words]
        return [w for w in words if w]
