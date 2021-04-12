#!/bin/sh
#
# Setup python virtual environment and install packages

python3.7 -m venv env
source env/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
