#!/usr/bin/env python
# -*- coding: utf-8 -*-

from application import create_app
app = create_app('config_dev')
app.run()
