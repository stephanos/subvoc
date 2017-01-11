import collections

import srt
from bs4 import BeautifulSoup
from nltk.tokenize import sent_tokenize


Sentence = collections.namedtuple('Sentence', ['text', 'time'])
SubtitleLine = collections.namedtuple('SubtitleLine', ['text', 'time'])


def parse_subtitle(subtitle):
    lines = []
    text_list = []
    for entry in srt.parse(subtitle.strip()):
        for line in entry.content.split("\n"):
            line_text = line.strip()
            if line_text.startswith('...'):
                line_text = line_text[3:].strip()
            if line_text.endswith('...'):
                line_text = line_text[:-3].strip()
            if line_text.startswith('-'):
                line_text = line_text[1:].strip()
            line_text = BeautifulSoup(line_text, 'lxml').text

            lines.append(SubtitleLine(line_text, entry.start))
            text_list.append(line_text)
    full_text = ' '.join(text_list)
    return lines, full_text


def to_sentences(lines, tokens):
    l, t, time, sentences = 0, 0, None, []
    while len(sentences) != len(tokens):
        if l < len(lines) and lines[l].text in tokens[t]:
            if time is None:
                time = lines[l].time
            l += 1
        else:
            sentences.append(Sentence(tokens[t], time))
            time = None
            t += 1
    return sentences


def parse(subtitle):
    lines, text = parse_subtitle(subtitle)
    tokens = sent_tokenize(text)
    return to_sentences(lines, tokens)
