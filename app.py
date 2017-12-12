import flask
from flask import Flask, flash, redirect, render_template, request, session, abort
import os
from sqlalchemy.orm import sessionmaker
from tabledef import *
import flask_login
import datetime
import logging
engine = create_engine(connString, echo=True)

app = Flask(__name__)
app.secret_key = os.urandom(12)

# timeout after inactivity testing.
@app.before_request
def before_request():
    flask.session.permanent = True
    app.permanent_session_lifetime = datetime.timedelta(minutes=1)
    flask.session.modified = True
    flask.g.user = flask_login.current_user

# static url cache buster http://flask.pocoo.org/snippets/40/
@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                     endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)



@app.route('/')
def home():
    if not session.get('logged_in'):
        return render_template('map.html')
    else:
         return render_template('map.html')


@app.route('/login', methods=['POST'])
def login():

    POST_USERNAME = str(request.form['username'])
    POST_PASSWORD = str(request.form['password'])

    Session = sessionmaker(bind=engine)
    s = Session()

    query = s.query(User).filter(User.username.in_(
        [POST_USERNAME]),
        User.password.in_([POST_PASSWORD])
        )

    result = query.first()

    if result:
        session['logged_in'] = True
        return render_template('map.html')
    else:
        # session['logged_in'] = False
        # flash('wrong password!')
        return home()

@app.route("/logout")
def logout():
    session['logged_in'] = False
    return home()


if __name__ == "__main__":
    app.run()
    app.logger.addHandler(logging.StreamHandler(sys.stdout))
    app.logger.setLevel(logging.ERROR)
 
