from flask import Flask, flash, render_template, request, jsonify, redirect, make_response, session, redirect, url_for
from mailer import Mailer

app = Flask(__name__)


@app.route('/')
def homePage():
    return render_template('index.html')

@app.route('/demo-submit-form', methods=['GET', 'POST'])
def demoSubmitForm():
    name =  request.form['name']
    email = request.form['email']
    studio = request.form['studio']

    subj = 'test'
    html = 'hi'

    email = Mailer()
    email.sendEmail(email,subj,html)

    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
