from flask import Flask
from namespaces import api


import pytest


@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    app = Flask(__name__)
    api.init_app(app)  
    app.config['RESTPLUS_MASK_SWAGGER'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/patients.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False    
    yield app
   

@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()
