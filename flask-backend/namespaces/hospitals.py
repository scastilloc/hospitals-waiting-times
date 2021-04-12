from flask import Flask, request
from flask_restplus import Resource, Namespace
import json
import requests

api = Namespace('hospitals', description='List of hospitals')

def call_hospitals_api():
	try:
		hospitals = {}
		resp =  requests.get('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals').json()
		if '_embedded' not in resp and 'hospitals' not in resp:
			return {}
		hospitals = resp['_embedded']['hospitals']
		total_pages = resp['page']['totalPages']
		current_page = resp['page']['number']	
		while current_page < total_pages:
			resp = requests.get(resp['_links']['next']['href']).json()
			hospitals.extend(resp['_embedded']['hospitals'])
			current_page = resp['page']['number']		
		return hospitals
	except:
		return {}

@api.route('')
class Hospitals(Resource):
	def get(self):
		pain_level = int(request.args.get('painlevel'))
		hospitals_json = call_hospitals_api()								
		hospitals = []	
		for hospital in hospitals_json:				
			for waiting_list_element in hospital['waitingList']:				
				if waiting_list_element['levelOfPain'] == pain_level:
					waiting_time = waiting_list_element['averageProcessTime'] * waiting_list_element['patientCount']	
					hospitals.append({'id' : hospital['id'],
									'name' : hospital['name'],
									'waitingTime' :  waiting_time})
		
		hospitals = sorted(hospitals, key=lambda k: k['waitingTime']) 
		return {'hospitals': hospitals}, 200