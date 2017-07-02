from flask import Flask, flash, render_template, request, jsonify, redirect, make_response, session, redirect, url_for
from mailer import Mailer
from pymongo import MongoClient, GEO2D

app = Flask(__name__)

db = MongoClient('52.15.58.213', 27017).test

@app.route('/')
def homePage():
    return render_template('index.html')

@app.route('/demo-submit-form', methods=['GET', 'POST'])
def demoSubmitForm():

    name =  request.form['name']
    email = request.form['email']
    studio = request.form['studio']

    leads = {}
    leads['name'] = name
    leads['email'] = email
    leads['studio'] = studio

    db.leads.insert(leads)

    toaddr = email
    subj = 'Your Yoglytics Demo!'
    html = """
    Hey, """+name+""",<br>
    I'm so glad you reached out to us!!<br>
    Your request for a demo was sent directly to the CEO! He should be reaching out shortly :).<br>
    Cheers
    """
    mailer = Mailer()
    mailer.send(toaddr,subj,html)

    toaddrTwo = 'esteininger21@gmail.com'
    subjTwo = 'Yogilytics demo request made!'
    htmlTwo = """
    Customer email: """+email+"""<br>
    Customer Name: """+name+"""<br>
    Customer Studio: """+studio+"""<br>
    """
    mailerTwo = Mailer()
    mailerTwo.send(toaddrTwo,subjTwo,htmlTwo)

    return ''

@app.route('/demo-submit-form-validate', methods=['GET', 'POST'])
def demoValidateSubmitForm():
    return 'success'



if __name__ == '__main__':
    app.run(debug=True)
