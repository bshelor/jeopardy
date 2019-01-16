from flask import Flask, render_template, redirect, flash, url_for, session, request

from flask_wtf import FlaskForm
from wtforms.fields import FileField
from wtforms import StringField, SubmitField, SelectField, PasswordField, FloatField, BooleanField, TextAreaField
from wtforms.validators import Email, Length, InputRequired, Regexp, EqualTo, NumberRange
from wtforms.fields.html5 import IntegerField

import db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Super Secret Unguessable Key'


@app.before_request
def before_request():
    db.connect()


@app.teardown_request
def teardown_request(exception):
    db.disconnect()


class loginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(message='Username Required')])
    password = PasswordField('Password', validators=[Length(min=9),
                                         Regexp(r'.*[A-Za-z]', message="Must have at least one letter"),
                                         Regexp(r'.*[0-9]', message="Must have at least one digit")])
    remember = BooleanField('Keep me signed in', default=False)
    submit = SubmitField('Login')

class entry_fields(FlaskForm):
    c1_title = StringField('Category Title')
    c2_title = StringField('Category Title')
    c3_title = StringField('Category Title')
    c4_title = StringField('Category Title')
    c5_title = StringField('Category Title')

    c1_100 = TextAreaField('Question')
    c1_200 = TextAreaField('Question')
    c1_300 = TextAreaField('Question')
    c1_400 = TextAreaField('Question')
    c1_500 = TextAreaField('Question')

    c2_100 = TextAreaField('Question')
    c2_200 = TextAreaField('Question')
    c2_300 = TextAreaField('Question')
    c2_400 = TextAreaField('Question')
    c2_500 = TextAreaField('Question')

    c3_100 = TextAreaField('Question')
    c3_200 = TextAreaField('Question')
    c3_300 = TextAreaField('Question')
    c3_400 = TextAreaField('Question')
    c3_500 = TextAreaField('Question')

    c4_100 = TextAreaField('Question')
    c4_200 = TextAreaField('Question')
    c4_300 = TextAreaField('Question')
    c4_400 = TextAreaField('Question')
    c4_500 = TextAreaField('Question')

    c5_100 = TextAreaField('Question')
    c5_200 = TextAreaField('Question')
    c5_300 = TextAreaField('Question')
    c5_400 = TextAreaField('Question')
    c5_500 = TextAreaField('Question')

    submit = SubmitField('Continue to Answers')
    save = SubmitField('Save and Return Later')


# class category_two_fields(FlaskForm):
#     title = StringField('Category Title')
#     level_100 = TextAreaField('Question')
#     level_200 = TextAreaField('Question')
#     level_300 = TextAreaField('Question')
#     level_400 = TextAreaField('Question')
#     level_500 = TextAreaField('Question')
#     submit = SubmitField('Submit')
#
#
# class category_three_fields(FlaskForm):
#     title = StringField('Category Title')
#     level_100 = TextAreaField('Question')
#     level_200 = TextAreaField('Question')
#     level_300 = TextAreaField('Question')
#     level_400 = TextAreaField('Question')
#     level_500 = TextAreaField('Question')
#     submit = SubmitField('Submit')
#
#
# class category_four_fields(FlaskForm):
#     title = StringField('Category Title')
#     level_100 = TextAreaField('Question')
#     level_200 = TextAreaField('Question')
#     level_300 = TextAreaField('Question')
#     level_400 = TextAreaField('Question')
#     level_500 = TextAreaField('Question')
#     submit = SubmitField('Submit')
#
#
# class category_five_fields(FlaskForm):
#     title = StringField('Category Title')
#     level_100 = TextAreaField('Question')
#     level_200 = TextAreaField('Question')
#     level_300 = TextAreaField('Question')
#     level_400 = TextAreaField('Question')
#     level_500 = TextAreaField('Question')
#     submit = SubmitField('Submit')


@app.route('/', methods=['GET', 'POST'])
def index():
    users = db.get_all_users()

    login_form = loginForm()

    print(users)

    if login_form.validate_on_submit():
        return "Congrats, you've logged in!"
    return render_template("index.html", form=login_form, users=users)


@app.route('/entry-board', methods=['GET','POST'])
def enter_questions():
    fields = entry_fields()

    # print("got here")
    print(request.method)
    if request.method == 'POST':
        # if fields.validate_on_submit():
        print("test")
        # print(fields.submit)
        # print(fields.save)
        if request.form['submit'] == 'Save and Return Later':
            print("Save and return later")
        elif request.form['submit'] == 'Continue to Answers':
            print("answers")

        return render_template("entry_board.html", fields=fields)

    if request.method == 'GET':
        pass
        # print("got to get")

    return render_template("entry_board.html", fields=fields)


#-----------------------------------

if __name__ == '__main__':
    app.run(debug=True)