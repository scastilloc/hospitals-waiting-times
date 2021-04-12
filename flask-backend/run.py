
from flask import Flask, request
from flask_restplus import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from namespaces import api
from data.orm import db

import json

app = Flask(__name__)
api.init_app(app)

app.config['RESTPLUS_MASK_SWAGGER'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/patients.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app) 
db.init_app(app)
db.create_all() 


@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response

if __name__ == '__main__':
	app.run(debug=True)

