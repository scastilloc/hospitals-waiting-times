from flask_restplus import Api
from .illnesses import api as illnesses_ns
from .pain_levels import api as pain_levels_ns
from .hospitals import api as hospitals_ns
from .patients import api as patients_ns

api = Api(title='PALO IT challenge API',
    version='1.0',
    description='PALO IT challenge API')
  
api.add_namespace(illnesses_ns, path='/api/v1/illnesses')
api.add_namespace(pain_levels_ns, path='/api/v1/painlevels')
api.add_namespace(hospitals_ns, path='/api/v1/hospitals')
api.add_namespace(patients_ns, path='/api/v1/patients')
