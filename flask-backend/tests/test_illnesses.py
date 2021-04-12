import pytest

class TestIllnesses():
    """
    Tests for the /illnesses route
    """
    def test_get_illnesses(self, client, app):            
        # Get /illnesses
        response = client.get('/api/v1/illnesses')

        # Validate response
        assert response.status_code == 200, 'Expected successful response'
        assert response.is_json, 'Expected application/json response'
        data = response.get_json()
        expected_keys = ['illnesses', 'id', 'name']        
        assert list(
            data.keys()) == expected_keys, 'Expected only illnesses, id, name in response'
