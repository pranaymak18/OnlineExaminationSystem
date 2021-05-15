import { Modal } from 'react-bootstrap';
import {useState} from 'react'
import Button from '@material-ui/core/Button';

import ClipLoader from "react-spinners/ClipLoader";

import  {FormGroup, Label, Input} from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
const axios = require('axios');
const path = require('path');
const electron = window.require('electron');
const Notification = electron.remote.Notification; 

export default function EditModals(props) {
    const [show, setShow] = useState(false);
    const [exam,setExam] = useState({
      examId: props.exam.examId,
      type: props.exam.type,
      formLink : props.exam.formLink,
      subjectName : props.exam.subjectName,
      examDate : props.exam.examDate,
      examDuration : props.exam.examDuration,
      examDescription : props.exam.examDescription,
      pdf:props.exam.pdf,
      pdfName:props.exam.pdf
    })
    const [spinner,setSpinner] = useState(false)
  //  alert(props.exam.examId)
    let examId = props.examId
    const handleClose = () =>{
      
      setExam(
        {
          formLink : props.exam.formLink,
          subjectName : props.exam.subjectName,
          examDate : props.exam.examDate,
          examDuration : props.exam.examDuration,
          examDescription : props.exam.examDescription,
          pdf:props.exam.pdf,
          pdfName:props.exam.pdf
        }
      )
      setShow( false)
    } 
    const handleShow = () => {setShow( true)} 
   

    const submit = () => {
        if(exam.formLink === props.exam.formLink && exam.subjectName === props.exam.subjectName && exam.examDate ===  props.exam.examDate && exam.examDuration === props.exam.examDuration && exam.examDescription === props.exam.examDescription)
        { 
         // alert("nothings changed")
          setShow( false)
        }
        
        else{
         setSpinner(true)
        axios.post('http://localhost:5000/editExam',{exam})
        .then((response)=>{     
           // alert(response.data.message);
            setSpinner(false)

            window.location.reload()
            const options = { 
              title: 'Message', 
              subtitle: 'Total', 
              body: `${response.data.message}`, 
              silent: false, 
              icon: path.join(__dirname, '../assets/image.png'), 
              hasReply: true,   
              timeoutType: 'never',  
              replyPlaceholder: 'Reply Here', 
              sound: path.join(__dirname, '../assets/sound.mp3'), 
              urgency: 'critical' ,
              closeButtonText: 'Close Button',
              actions: [ { 
                  type: 'button',  
                  text: 'Show Button'
              }] 
          } 
          const customNotification = new Notification(options)
          customNotification.show()
          setShow( false)

        })
      }

    }
    const fileUpload = e => {

      let value = e.target.files
      // console.log(files);
      let name = e.target.name

      let reader = new FileReader();
      reader.readAsDataURL(value[0]);
     
      
      setExam(
        (prevalue) => {
          return {
            ...prevalue,   // Spread Operator               
            pdfName: value[0].name
          }
        }
      );
      reader.onload = (file) => {
          setExam(
            (prevalue) => {
              return {
                ...prevalue,   // Spread Operator               
                [name]: file.target.result
              }
            }
          );
         // alert(exam.pdfName)
      }
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
            <Modal.Title>Edit exam</Modal.Title>
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
                        <center>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={spinner}
                            
                        />
                    </center>

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
              <Modal.Title>Edit Exam</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                    Upload PDF File
                    <div style={{ borderStyle: 'solid', borderColor:"#F5F5F5" ,padding:"10px" , borderRadius:"5px"  }}>
                    <FormGroup>
                        <Input type="file" name="pdf" id="pdf"  onChange={fileUpload} placeholder={`${props.exam.pdfName}`} />
                    </FormGroup>
                    </div>
                    <br />
                    <FormGroup>
                        <Label for="subjectName">Subject Name</Label>
                        <Input type="text" name="subjectName" id="subjectName" placeholder={`${props.exam.subjectName}`} onChange={onchange} />
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
            <center>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={spinner}
                            
                        />
                    </center>
  
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
  
