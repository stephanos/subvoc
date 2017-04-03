subvoc [![Build Status](https://secure.travis-ci.org/stephanos/subvoc.png)](https://travis-ci.org/stephanos/subvoc) [![Coverage Status](https://coveralls.io/repos/github/stephanos/subvoc/badge.svg?branch=master)](https://coveralls.io/github/stephanos/subvoc?branch=master)
======

This project was created by me to scratch my own itch.
I love to watch movies and am always keen to expand my vocabulary.
But it's difficult to notice an unknown word *during* a movie without spoiling the experience.
That's where `subvoc` comes in: search for a movie and discover its vocabulary.


## Online Demo

Visit https://subvoc.stephanbehnke.com (hosted on Heroku, takes a few moments to start sometimes).

NOTE: The external API can be flaky - you can search for 'Se7en' (be exact) to use a cached movie in this case.

To get a very quick impression, here are some screenshots:

Homepage                       | Find Movie                | List of words             | Word details
:-----------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![](./static/img/homepage.png) | ![](./static/img/movie-select.png) | ![](./static/img/list-words.png) | ![](./static/img/detail-word.png)


## How it works

When you select a movie, the [OpenSubtitles API](http://trac.opensubtitles.org/projects/opensubtitles/wiki/XMLRPC) is queried for its subtitles. Then, the result is parsed, tokenized and analyzed sentence by sentence, word by word with the help of the [Python Natural Language Toolkit](http://www.nltk.org). The difficulty of a word is determined by its relative frequency in the English language, assuming that more difficult words are simply used less.


## Features

 - [x] landing page with search bar
 - [x] search movie by query
 - [x] sort search results by popularity
 - [x] host on Heroku
 - [x] list of words sorted by difficulty
 - [x] use the base of each word
 - [x] lazy load analysis
 - [x] show movie context for each word
 - [x] include movie poster
 - [ ] support for idioms
 - [ ] support for TV show episodes
 - [ ] show context in another language side by side
 - [ ] wild idea: display YouTube videos with a certain word


## Development

### With Docker:

 - run web app with `scripts/dev-py.sh`
 - test web app with `scripts/test-py.sh`
 - compile Javascript with `scripts/dev-js.sh`
 
### Without Docker:

installation:

 - install Python 3.x and Node 6+ 
 - `pip install -r requirements.txt`
 - `pip install -r dev-requirements.txt`
 - `python -m nltk.downloader $(tr "\n" " " < ".nltk_packages")`
 - `npm i` or `yarn`

then:

 - run web app with `python run.py`
 - test web app with `pytest`
 - compile Javascript with `./node_modules/rollup/bin/rollup --config --watch`

## License
MIT (see LICENSE).
