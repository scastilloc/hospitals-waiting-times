from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Patient(db.Model):
	__tablename__ = 'patients'
	id = db.Column(db.Integer, primary_key=True)
	first_name = db.Column(db.String(30))
	last_name = db.Column(db.String(30))
	illness_id = db.Column(db.Integer) 
	pain_level = db.Column(db.Integer)
	date_created = db.Column(db.DateTime, default=datetime.now)