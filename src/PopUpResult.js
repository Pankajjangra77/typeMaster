import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function PopUpResult({wpm, cpm, accuracy}) {

    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        window.location.reload();
    };
    
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header >
                    <Modal.Title>Your Results!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <b>WPM:</b> {wpm} 
                            <br></br>
                            <b>CPM:</b> {cpm}
                            <br></br>
                            <b>ACCURACY:</b> {accuracy}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Restart
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUpResult;
