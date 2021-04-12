import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as NextIcon } from '../icons/next.svg';
import { useHistory } from 'react-router-dom';

export default function Illnesses() {
   
    const [illnesses, setIllnesses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    let history = useHistory();

    useEffect(() => {
        fetch('/api/v1/illnesses')
            .then((res) => {
                if (res.status !== 200) {
                    console.log("error")
                }
                return res.json(); 
            })
            .then(
                (result) => {
                    setIllnesses(result.illnesses);                    
                    setIsLoaded(true);
                })
    },[]);

    const handleOnClick = (e) => {                
        e.preventDefault();
        const illnessId = e.currentTarget.dataset.illnessid;
        const illnessName = e.currentTarget.dataset.illnessname;
        history.push({
            pathname: `/illnesses/${illnessId}/painlevels`,
            state: {'illnessId':illnessId, 'illnessName' : illnessName }
          });

    };

    const data = illnesses.map((illness) => (           
              
            <Row key={illness.id}>
                <Col>                    
                    <div className = "container-inner-div">                
                        <div className = "align-left">                           
                            {illness.name}                                                     
                        </div>
                        <div className = "align-right">                            
                            <NextIcon height="1.5em" width="1.5em" className = "hand-pointer" data-illnessid={illness.id} data-illnessname={illness.name} onClick={handleOnClick}/>                            
                        </div>
                    </div>
                </Col>
            </Row>
        
    ));    

    return (
        <div className = "center main-container">  
            <Row>
                <Col>                            
                    <h2>Select an illness:</h2>                                                        
                </Col>
            </Row>
            <Row>
                <Col> 
                    {isLoaded ? (data) : (<span>Loading...</span>)} 
                </Col>
            </Row>
        </div>  
    );
};
        


