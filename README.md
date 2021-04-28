# hospitals-waiting-times

## Description
Web application that calculates average waiting times in rooms at hospitals, according to a selected level of pain of the patient. 
1.	The patient/user selects an illness from a list displayed in the home page. This information is extracted from an external API endpoint.
2.	Once an illness is chosen, a new page is shown with 5 pain levels (from “no pain”, until “severe pain”). The user selects one pain level.
3.	Having selected the level of pain, the application calls a second API endpoint to extract the list of available hospitals, and their average processing time per patient, and number of patients.
4.	For each hospital, and based on the pain level, the average waiting time is calculated (multiplying the average processing time per patient times and the number of patients). The list of hospitals is listed and sorted by waiting time (from lowest to highest).
5.	The last page represents a form to store information of the patient in the database. It asks for name of the patient and stores the selected illness and pain level. 

## Technical stack
* Backend:
    - Flask Restplus
    - Python 3
    - Sqlite DB
    - SQLAlchemy

* Frontend:
    - React JS

## Instructions
### Python virtual environment
* Configure the python environment

```shell
cd flask-backend
bash scripts/configure-python.sh
```

### Running Backend
* Open a terminal 
* Start the Backend

```shell
cd flask-backend
bash scripts/run-api.sh
```

### Running the Frontend 
* Open another terminal 
* Start the Frontend

```shell
cd react-frontend
npm start
```
