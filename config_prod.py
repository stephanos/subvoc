import os

# flask core settings
DEBUG = False
TESTING = False

# project settings
OPENSUBTITLES_USER = os.environ.get('OPENSUBTITLES_USER')
OPENSUBTITLES_PASS = os.environ.get('OPENSUBTITLES_PASS')
