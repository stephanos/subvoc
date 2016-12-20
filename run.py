#!/usr/bin/env python

from application import create_app
app = create_app('config_dev')
app.run()
