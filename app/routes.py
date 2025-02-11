from flask import Flask, render_template, request, redirect, url_for, session, make_response,jsonify


__fp__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

app = Flask(__name__)

@app.route('/index')
def index():
    return render_template('index.html', template_folder='../')