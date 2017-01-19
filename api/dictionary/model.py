from collections import defaultdict


class WordInfo:
    def __init__(self, token, attribution_text, attribution_url):
        self.attribution_text = attribution_text
        self.attribution_url = attribution_url
        self.info_by_pos = defaultdict(list)
        self.token = token

    def add_info(self, info):
        self.info_by_pos[info['pos']].append(info)
