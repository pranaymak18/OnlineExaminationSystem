import { Modal } from 'react-bootstrap';
import {useState} from 'react'
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
const axios = require('axios');

export default function Modals(props) {
    const [show, setShow] = useState(false);
    //alert(props.examId)
    let examId = props.examId
    const handleClose = () =>{setShow( false)} 
    const handleShow = () => {setShow( true)} 
    const removeExam = () => {
        
        axios.post('http://localhost:5000/deleteExam',{examId})
        .then((response)=>{     
            alert(response.data.message);
            window.location.reload()

        })
        setShow( false)
    }
  
    return (
      <>
        <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={handleShow}>
            Delete
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sure you want to delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>If you delete any exam the responses will also get deleted</Modal.Body>
          <Modal.Footer>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close 
            </Button>
            <p> </p>
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={removeExam}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
