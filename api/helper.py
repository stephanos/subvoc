import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry


class Fetcher:

    def __init__(self, base_url, retries=5):
        self.base_url = base_url
        retry = Retry(total=retries, status_forcelist=[500, 502, 503, 504, 520, 521])
        self.session = requests.Session()
        self.session.mount(base_url, HTTPAdapter(max_retries=retry))

    # TODO: concurrent requests (but not based on gevents, since it kills NLTK)
    def get(self, paths):
        urls = ["{}{}".format(self.base_url, path) for path in paths]
        return [self.session.get(u) for u in urls]
