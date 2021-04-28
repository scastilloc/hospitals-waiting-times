"""
patients.py

Namespace for Patients
Stores patient's information in DB
"""

from flask import Flask, request
from flask_restplus import Resource, Namespace, reqparse
import json
from data.orm import db, Patient

api = Namespace('patients', description='Information of the patient')

parser = reqparse.RequestParser()
parser.add_argument('first_name', required=True, 
					help='First name of the patient')
parser.add_argument('last_name', required=True, 
					help='Last name of the patient')
parser.add_argument('pain_level', type=int, required=True,
                    help='Level of pain (0 to 4)')
parser.add_argument('illness_id', type=int, required=True, 
					help='Illness unique identificator')


def validate_input(pain_level, illness_id, first_name, last_name):
	"""
	Verifies that every argument is valid (having a value != None),
	returning True in that case. Otherwise it returns False.
	"""
	if pain_level is None or illness_id is None or first_name is None or last_name is None:
		return False
	return True



@api.route('')				
class PatientInformation(Resource):
	@api.expect(parser, validate=True)
	def post(self):
		"""
		Stores information of a patient if every argument is valid.
		"""
		args = parser.parse_args()			
		pain_level = args.get('pain_level')
		illness_id = args.get('illness_id')
		first_name = args.get('first_name')
		last_name = args.get('last_name')
		if(not validate_input(pain_level, illness_id, first_name, last_name)):
			api.abort(400, f'Patient information not complete')
		patient = Patient(first_name = first_name, last_name = last_name, pain_level = pain_level, illness_id = illness_id)
		db.session.add(patient)
		db.session.commit()
		
		return {'message': 'patient information stored successfully'}, 200