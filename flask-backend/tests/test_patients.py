import pytest
from namespaces import patients

class TestPatient():
    def test_patient(self):        
        assert patients.validate_input(None, 1 ,'name1', 'lastname1') == False, 'patient parameters are invalid'
        assert patients.validate_input(0, 1 ,'name1', 'lastname1') == True, 'patient parameters are valid'

        
