/**
* patient.component.js
* 
* Displays a form with selected level of pain, illness, and fields to
* enter the patient's name. The information is stored in DB
*/

import React from 'react';
import { useState } from "react";
import { Form, Button,  Row, Col } from "react-bootstrap";
import {useLocation} from 'react-router-dom';


export default function Patient() {
    const { state } = useLocation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    const dataPost = new FormData();
    dataPost.append('first_name', firstName);
    dataPost.append('last_name', lastName);
    dataPost.append('pain_level', state.painLevel);
    dataPost.append('illness_id', state.illnessId);

    // Calls patients API to store information in DB
    const handleSubmit = (e) => {
        e.preventDefault();        
        fetch("api/v1/patients", { body: dataPost, method: "POST" })
            .then((res) => {
                if (res.status !== 200) {
                    console.log("error");
                }
                return res.json();
            })
            .then((result) => {
                alert('Information stored successfully');                
            });
    };

    return (
        <div className = "center main-container">
            <Row>
                <Col>
                <h2>Information of the patient</h2>
                    <div>
                        <Row>  
                            <Col>
                                <div className = "container-inner-div"> 
                                    <div className = "patient-align-left">
                                        Illness: 
                                    </div>
                                    <div className = "patient-align-right">                            
                                        {state.illnessName}
                                    </div>
                                </div>
                                
                            </Col>   
                        </Row>
                        <Row>  
                            <Col>
                                <div className = "container-inner-div"> 
                                    <div className = "patient-align-left">
                                        Level of pain:  
                                    </div>
                                    <div className = "patient-align-right">                            
                                        {state.painDesc}
                                    </div>
                                </div>
                            </Col>   
                           
                        </Row>
                    </div>
                    <div>
                        <Form onSubmit={handleSubmit}>

                            <Form.Group className = "container-inner-div">
                                <Form.Label className = "patient-align-left">First name:</Form.Label>
                                <Form.Control required type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" />
                            </Form.Group>
                            <Form.Group className = "container-inner-div">
                                <Form.Label className = "patient-align-left">Last name:</Form.Label>
                                <Form.Control required type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" />
                            </Form.Group>                                                        
                            <Button size="lg" block className="mt-4" variant="primary" type="submit">Save</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>      
    );


};
        


