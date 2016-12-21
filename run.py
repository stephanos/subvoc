#!/usr/bin/env python

import os
from application import create_app
from flask import render_template


config_filename = 'config_' + (os.environ.get('env', 'prod')).lower()
app = create_app(config_filename)

@app.route('/')
def home():
  return render_template('home.html')

app.run()
