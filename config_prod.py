import os

# flask core settings
DEBUG = False
TESTING = False

# project settings
FANART_TV_KEY = os.environ.get('FANART_TV_KEY')
OPENSUBTITLES_USER = os.environ.get('OPENSUBTITLES_USER')
OPENSUBTITLES_PASS = os.environ.get('OPENSUBTITLES_PASS')
WORDNIK_KEY = os.environ.get('WORDNIK_KEY')
