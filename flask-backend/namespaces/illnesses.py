from flask import Flask
from flask_restplus import Resource, Namespace
import json
import requests

api = Namespace('illnesses', description='List of illnesses')

def call_illnesses_api():
	try:
		illnesses = {}
		resp =  requests.get('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses').json()
		if '_embedded' not in resp and 'illnesses' not in resp:
			return {}
		illnesses = resp['_embedded']['illnesses']
		total_pages = resp['page']['totalPages']
		current_page = resp['page']['number']		
		while current_page < total_pages:
			resp = requests.get(resp['_links']['next']['href']).json()
			illnesses.extend(resp['_embedded']['illnesses'])
			current_page = resp['page']['number']				
		return illnesses
	except:
		return {}

@api.route('/')
class Illnesses(Resource):
	def get(self):	
		illnesses_json = call_illnesses_api()	
		illnesses = []
		for element in illnesses_json:
			illnesses.append({'id': element['illness']['id'], 'name': element['illness']['name']})			
		response = {}
		response['illnesses'] = illnesses
		return response, 200