from collections import namedtuple

import srt
from bs4 import BeautifulSoup

from domain.tokenizer import Tokenizer


Sentence = namedtuple('Sentence', ['text', 'time'])
SubtitleLine = namedtuple('SubtitleLine', ['text', 'time'])


class Parser:

    def __init__(self):
        self.tokenizer = Tokenizer()

    def parse(self, subtitle):
        lines, text = self._parse_lines(subtitle)
        tokens = self.tokenizer.sentences(text)
        return self._to_sentences(lines, tokens)

    def _parse_lines(self, subtitle):
        lines = []
        text_buffer = []
        for entry in srt.parse(subtitle.strip()):
            for line in entry.content.split("\n"):
                line_text = line.strip()
                if line_text.startswith('...'):
                    line_text = line_text[3:].strip()
                if line_text.endswith('...'):
                    line_text = line_text[:-3].strip()
                if line_text.startswith('-'):
                    line_text = line_text[1:].strip()
                line_text = BeautifulSoup(line_text, 'html.parser').text

                lines.append(SubtitleLine(line_text, entry.start))
                text_buffer.append(line_text)
        full_text = ' '.join(text_buffer)
        return lines, full_text

    def _to_sentences(self, lines, tokens):
        sentences = []
        l, t = 0, 0
        token = None
        line_buffer = []
        line_text = None

        while t < len(tokens):
            if token is None:
                token = tokens[t]
            elif len(token.strip()) == 0:
                sentences.append(Sentence(tokens[t], line_buffer[0].time))
                line_buffer = []
                token = None
                t += 1
                continue

            if line_text is None:
                line_text = lines[l].text
            line_buffer.append(lines[l])

            if token.startswith(line_text):
                token = token[len(line_text):].strip()
                line_text = None
                l += 1
            elif line_text.startswith(token):
                line_text = line_text[len(token):].strip()
                token = ''
            else:
                raise RuntimeError('token/line mismatch')

        return sentences
