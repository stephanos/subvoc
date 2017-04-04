from flask import render_template


def error():
    return render_template('error.html')
