from requests import Session
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

import grequests


class Fetcher:

    def __init__(self, base_url, retries=5):
        self.base_url = base_url
        retry = Retry(total=retries, status_forcelist=[500, 502, 503, 504, 520, 521])
        self.session = Session()
        self.session.mount(base_url, HTTPAdapter(max_retries=retry))

    def get(self, paths, parallel=10):
        urls = ["{}{}".format(self.base_url, path) for path in paths]
        requests = [grequests.get(u, session=self.session) for u in urls]
        return grequests.map(requests, size=parallel)
