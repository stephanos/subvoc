import os
from flask import Flask, render_template


config_filename = os.environ.get('CONFIG', 'config_dev')
app = Flask(__name__, static_url_path='/static')


app.config.from_object(config_filename)


@app.route('/')
def home():
    return render_template('home.html')
