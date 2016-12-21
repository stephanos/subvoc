#!/usr/bin/env python

from application import create_app
from flask import render_template


app = create_app('config_dev')

@app.route('/')
def home():
  return render_template('home.html')

app.run()
