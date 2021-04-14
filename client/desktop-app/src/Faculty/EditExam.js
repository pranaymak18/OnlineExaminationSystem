import { Modal } from 'react-bootstrap';
import {useState} from 'react'
import Button from '@material-ui/core/Button';

import  {FormGroup, Label, Input} from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import { duration } from '@material-ui/core';
const axios = require('axios');

export default function EditModals(props) {
    const [show, setShow] = useState(false);
    const [exam,setExam] = useState({
      examId: props.exam.examId,
      formLink : props.exam.formLink,
      subjectName : props.exam.subjectName,
      examDate : props.exam.examDate,
      examDuration : props.exam.examDuration,
      examDescription : props.exam.examDescription,
      pdf:"",
      pdfName:""
    })
  //  alert(props.exam.examId)
    let examId = props.examId
    const handleClose = () =>{
      
      setExam(
        {
          formLink : props.exam.formLink,
          subjectName : props.exam.subjectName,
          examDate : props.exam.examDate,
          examDuration : props.exam.examDuration,
          examDescription : props.exam.examDescription
        }
      )
      setShow( false)
    } 
    const handleShow = () => {setShow( true)} 
   

    const submit = () => {
      //  alert(exam.formLink+" "+exam.subjectName+" "+exam.examDate+" "+exam.examDuration+" "+exam.examDescription)
        axios.post('http://localhost:5000/editExam',{exam})
        .then((response)=>{     
            alert(response.data.message);
            window.location.reload()

        })
        setShow( false)

    }

    const onchange = (event) =>{
      let value = event.target.value;
      let name = event.target.name;
      
        if(value ===""){
          if(name === "formLink")
          {
            setExam((prevalue) => {
              return {
                ...prevalue,   // Spread Operator               
                [name]: props.exam.formLink
              }
            })
          }
          else if(name === "subjectName")
          {
            setExam((prevalue) => {
              return {
                ...prevalue,   // Spread Operator               
                [name]: props.exam.subjectName
              }
            })
          }
          else if(name === "examDate")
          {
            setExam((prevalue) => {
              return {
                ...prevalue,   // Spread Operator               
                [name]: props.exam.examDate
              }
            })
          }
          else if(name === "examDuration")
          {
            setExam((prevalue) => {
              return {
                ...prevalue,   // Spread Operator               
                [name]: props.exam.examDuration
              }
            })
          }
          else 
          {
            setExam((prevalue) => {
              return {
                ...prevalue,   // Spread Operator               
                [name]: props.exam.examDescription
              }
            })
          }
          
        }
        else{
        setExam((prevalue) => {
          return {
            ...prevalue,   // Spread Operator               
            [name]: value
          }
        })
      }

      
     
        
    }
    if(props.exam.type === "mcq")
    {
  
    return (
      <>
        <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleShow}>
            Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.exam.examId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
                
                <FormGroup>
                
               
                            <Label for="formLink">Form Link</Label>
                            <Input type="url" name="formLink" id="formLink" placeholder={`${props.exam.formLink}`}  onChange={onchange} ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="subjectName">Subject Name</Label>
                            <Input type="text" name="subjectName" id="subjectName" placeholder={`${props.exam.subjectName}`} onChange={onchange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examDate">Exam Date</Label>
                            <Input type="date" name="examDate" id="examDate" placeholder={`${props.exam.examDate}`} onChange={onchange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="duration">Duration</Label>
                            <Input type="number" step="1" name="examDuration" id="duration" placeholder={`${props.exam.examDuration}`} onChange={onchange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description(Optional)</Label>
                            <Input type="text" name="examDescription" id="examDescription" placeholder={`${props.exam.examDescription}`} onChange={onchange} ></Input>
                        </FormGroup>
                        </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close 
            </Button>
            <p> </p>
            <Button variant="contained" color="secondary" startIcon={<EditIcon />} onClick={submit}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
    }

    return (
        <>
          <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleShow}>
              Edit
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.exam.examId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
  
            </Modal.Body>
            <Modal.Footer>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close 
              </Button>
              <p> </p>
              <Button variant="contained" color="secondary" startIcon={<EditIcon />} onClick={handleClose}>
                Done
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    
  }
  
