from flask import Flask, flash, render_template, request, jsonify, redirect, make_response, session, redirect, url_for

app = Flask(__name__)

@app.route('/')
def homePage():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
