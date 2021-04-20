import pytest

class TestHospitals():
    """
    Tests for the /hospitals route
    """
    def test_get_hospitals(self, client, app):            
        # Get /hospitals
        response = client.get('/api/v1/hospitals?painlevel=1')

        # Validate response
        assert response.status_code == 200, 'Expected successful response'
        assert response.is_json, 'Expected application/json response'
        data = response.get_json()
        expected_keys = ['hospitals']        
        assert list(
            data.keys()) == expected_keys, 'Expected only hospitals in response'
