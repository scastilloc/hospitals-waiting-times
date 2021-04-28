import pytest
from namespaces import patients

class TestPatient():
    """
    Tests for the /patients route
    """
    def test_patient(self):      
        """
        Unit test for patients.validate_input function.
        """  
        assert patients.validate_input(None, 1 ,'name1', 'lastname1') == False, 'patient parameters are invalid'
        assert patients.validate_input(0, 1 ,'name1', 'lastname1') == True, 'patient parameters are valid'

        
