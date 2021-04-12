import React from 'react';
import { Col,  Row } from 'react-bootstrap';

export default function NotFound() {
    document.title = 'Page not found';

    return (
        <div>        
            <Row>
                <Col>
                    <h1>Page not found.</h1>
                    <p>You tried to load a page that doesn't exist.</p>
                </Col>
            </Row>
                   
        </div>
    );
}