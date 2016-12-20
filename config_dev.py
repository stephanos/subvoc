# -*- coding: utf-8 -*-

import credentials

# flask core settings
DEBUG = True
TESTING = False
SECRET_KEY = 'qh\x98\xc4o\xc4]\x8f\x8d\x93\xa4\xec\xc5\xfd]\xf8\xb1c\x84\x86\xa7A\xcb\xc0'
PERMANENT_SESSION_LIFETIME = 60 * 60 * 24 * 30

# project settings
OPENSUBTITLES_USER = credentials.OPENSUBTITLES_USER
OPENSUBTITLES_PASS = credentials.OPENSUBTITLES_PASS
