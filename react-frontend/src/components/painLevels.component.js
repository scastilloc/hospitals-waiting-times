/**
* illnesses.component.js
* 
* Displays a list of pain levels.
*/

import React from 'react';
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {useLocation} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ReactComponent as PainLevel0 } from '../icons/0-pain-level.svg';
import { ReactComponent as PainLevel1 } from '../icons/1-pain-level.svg';
import { ReactComponent as PainLevel2 } from '../icons/2-pain-level.svg';
import { ReactComponent as PainLevel3 } from '../icons/3-pain-level.svg';
import { ReactComponent as PainLevel4 } from '../icons/4-pain-level.svg';


export default function PainLevels() {    
    let history = useHistory();
    const { state } = useLocation();
    const [painLevels, setPainLevels] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);

    // Calls the pain levels API
    useEffect(() => {
        fetch('/api/v1/painlevels')
            .then((res) => {
                if (res.status === 401) {
                    console.log("error")
                }
                return res.json();
            })
            .then(
                (result) => {
                    setPainLevels(result.pain_levels);
                    setIsLoaded(true);
                })
    },[]);

    const handleOnClick = (e) => {    
        e.preventDefault();
        const painLevel = e.currentTarget.dataset.painlevel;
        const painLevelDesc = e.currentTarget.dataset.painleveldesc;
        history.push({
            pathname: `/illnesses/${state.illnessId}/painlevels/${painLevel}/hospitals`,
            state: {'illnessId':state.illnessId, 'illnessName' : state.illnessName , 'painLevel': painLevel, 'painDesc': painLevelDesc}
          });

    };

    // Creates a grid with pain levels and respective emojis.
    const data = painLevels.map((painLevel) => (     
        <Row key={painLevel.level}>
            <Col>
                <div className = "container-inner-div">
                    <div className = "align-left">                           
                        {painLevel.description}                                                     
                    </div>
                    <div className = "align-right">                   
                    {painLevel.level === '0' ? (
                        <PainLevel0 height="2em" width="2em" className = "hand-pointer" data-painlevel={painLevel.level} data-painleveldesc={painLevel.description} onClick={handleOnClick}/>                            
                    ) : (
                        painLevel.level === '1' ? (
                            <PainLevel1 height="2em" width="2em" className = "hand-pointer" data-painlevel={painLevel.level} data-painleveldesc={painLevel.description} onClick={handleOnClick}/>                            
                        ) : (
                            painLevel.level === '2' ? (
                                <PainLevel2 height="2em" width="2em" className = "hand-pointer" data-painlevel={painLevel.level} data-painleveldesc={painLevel.description} onClick={handleOnClick}/>                            
                            ) : (
                                painLevel.level === '3' ? (
                                    <PainLevel3 height="2em" width="2em" className = "hand-pointer" data-painlevel={painLevel.level} data-painleveldesc={painLevel.description} onClick={handleOnClick}/>                            
                                ) : (                                   
                                    <PainLevel4 height="2em" width="2em" className = "hand-pointer" data-painlevel={painLevel.level} data-painleveldesc={painLevel.description} onClick={handleOnClick}/>                            
                                   )   
                                )   
                            )   
                        )} 
                    </div>
                </div>
            </Col>
        </Row>
    ));    

    return (       
        <div className = "center main-container">  
            <Row>
                <Col>                            
                    <h2>Select a level of pain:</h2>                                                        
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
        


