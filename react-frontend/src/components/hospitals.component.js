/**
* hospitals.component.js
* 
* Displays a list of hospitals related to the selected pain level.
* Each hospital is sorted by average waiting time (lower to higher time)
*/

import React from 'react';
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import {useLocation} from 'react-router-dom';

export default function Hospitals() {

    const { state } = useLocation(); 
    const [hospitals, setHospitals] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);    
    let history = useHistory();

    // Calls the hospital API
    useEffect(() => {        
        fetch('/api/v1/hospitals?painlevel='+state.painLevel)
            .then((res) => {
                if (res.status !== 200) {
                    console.log("error")
                }
                return res.json();
            })
            .then(
                (result) => {
                    setHospitals(result.hospitals);                    
                    setIsLoaded(true);
                })
    },[state.painLevel]);
    
    /* Returns formatted hours and minutes.
       Input: total number of minutes
     */
    function getTimeString(totalMins)
    { 
        const hours = Math.floor(totalMins / 60);  
        const minutes = totalMins % 60;
        const hoursLabel = hours === 1 ? 'hr.' : 'hrs.'
        const minsLabel = minutes === 1 ? 'min.' : 'mins.'
            
        let timeString = '';
        if (hours > 0 && minutes > 0) 
            timeString = hours + ' ' + hoursLabel + ' ' + minutes + ' ' + minsLabel;
        else if (hours > 0 && minutes === 0) 
            timeString = hours + ' ' + hoursLabel;
        else if (hours === 0) 
            timeString = minutes + ' ' + minsLabel;
        return timeString;         
    }

    
    const data = hospitals.map((hospital) => (
        <Row key={hospital.id}>
            <Col>                    
                <div className = "container-inner-div">                
                    <div className = "hosp-align-left">                           
                        {hospital.name}                                                      
                    </div>
                    <div className = "hosp-align-right">
                        <Row>
                            <Col>                              
                                Waiting time:
                            </Col>            
                        </Row>
                        <Row>
                            <Col>                              
                            {getTimeString(hospital.waitingTime)}
                            </Col>            
                        </Row>

                    </div>
                </div>
            </Col>            
        </Row>
    ));    

    
    const handleNextPage = () => {           
        history.push({
            pathname: '/patient',
            state: state
          });
    };

    return (
        <div className = "center main-container">  
            <Row>
                <Col>                            
                    <h2>Suggested hospitals:</h2>                                                        
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        {isLoaded ? (data) : (<span>Loading...</span>)}                         
                    </div>
                </Col>                    
            </Row>
            <Row>
                <Col>                   
                    <Button className="btn" onClick={() => {handleNextPage()}}>Next</Button>                       
                </Col>                    
            </Row>              
        </div>       
    );


};
        


