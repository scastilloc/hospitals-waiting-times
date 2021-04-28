"""
pain_levels.py

Namespace for Pain levels
"""

from flask import Flask
from flask_restplus import Resource, Namespace
import json

api = Namespace('painlevels', description='List of levels of pain')

@api.route('')
class PainLevels(Resource):
	def get(self):
		"""
		Returns a list of levels of pain and description for each level.
		"""
		return {'pain_levels' : 
			[{'level': '0' , 'description': 'No pain'},
			{'level': '1' , 'description': 'Mild pain'},
			{'level': '2' , 'description': 'Moderate pain'},
			{'level': '3' , 'description': 'Severe pain'},
			{'level': '4' , 'description': 'Very severe pain'}]}, 200
