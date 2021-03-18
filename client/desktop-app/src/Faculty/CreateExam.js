import React, { Component, Fragment,useState } from 'react';
import uuid from 'react-uuid'
import FacultyHeader from './Header';
import { Breadcrumb, BreadcrumbItem, Jumbotron, Table, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { ExcelRenderer } from 'react-excel-renderer';
import _uniqueId from 'lodash/uniqueId';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const path = require('path');

const electron = window.require('electron'); 

const Notification = electron.remote.Notification; 


const shell = window.require('electron').shell;
const axios = require('axios');
class CreateExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: "",
            cols: "",
            uploadedFlag: false,
            showSpinner: false,
            showMessage: "none",
            message: "",
            cookie: "",
            name:"",
        }
        
        this.fileHandler = this.fileHandler.bind(this);
        this.createExam = this.createExam.bind(this);
        this.onChangeValue= this.onChangeValue.bind(this);
       
    }

    componentDidMount() {
        let temp = document.cookie.split("; ");
        let email = temp[0].split("=")[1];
        let role = temp[1].split("=")[1];
        let orgId = temp[2].split("=")[1];
        this.setState({
            cookie : {
                email : email,
                role : role,
                orgId : orgId
            }
        });
    }

    fileUpload = e => {

        let files = e.target.files
        // console.log(files);

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (file) => {
            this.setState({
                pdf: file.target.result,
                pdfName: files[0].name
            });
        }
    }

    onChangeValue = (event) => {
        //alert(event.target.value);
        if(event.target.value==="mcq")
        {
            //alert(event.target.value);
            this.setState({
                name : event.target.value
            })
        }
        if(event.target.value==="written")
        {
            //alert(event.target.value);
            this.setState({
                name : event.target.value
            })
        }
        if(event.target.value==="both")
        {
            //alert(event.target.value);
            this.setState({
                name : event.target.value
            })
        }
    }
    createExam = () => {
        
        this.id = uuid();
        let faculty=  this.state.cookie.email;
        alert("faculty is "+faculty+" this.id = "+this.id)
        
        
        let sbj = document.getElementById("subjectName").value;
        let date = document.getElementById("examDate").value;
        let dur = document.getElementById("duration").value;
        let des = document.getElementById("description").value;
        let formURL
        let answer =true
        alert(this.state.name)
        if(this.state.name === "mcq")
        {
         formURL = document.getElementById("formLink").value;
         answer=false
            
        }
        else if(this.state.name = "written"){
            formURL ="No mcq"
        }
      
       
        if(!formURL || !sbj || !date || !dur) {
            alert("Please enter the exam data correctly !");
        } else {
            alert("success");
            this.setState({
                showSpinner: true,
                showMessage: "none",
                message: ""
            });

            let reqBody = [];
            let facultyexam = [];
            let result = false
            
            
                //for faculty
            facultyexam.push({
                result:true,
                answersheet: answer,
                email: faculty,
                examId: this.id,
                formLink : formURL,
                subjectName : sbj,
                pdf: this.state.pdf,
                pdfName: this.state.pdfName,
                examDate : date,
                examDuration : dur,
                examDescription : des
            });
            axios.post('http://localhost:5000/createExam', {
                users: facultyexam
            })
            
            for (let i = 1; i < this.state.rows.length; i++) {
                if (!this.state.rows[i][0]) break;                
                reqBody.push({
                    resut:false,
                    answersheet: false,
                    email: this.state.rows[i][1],
                    examId: this.id,
                    formLink : formURL,                   
                    subjectName : sbj,
                    pdf: this.state.pdf,
                    pdfName: this.state.pdfName,
                    examDate : date,
                    examDuration : dur,
                    examDescription : des
                });
            }
            var self = this;
            axios.post('http://localhost:5000/createExam', {
                users: reqBody
            })
            .then(function (response) {
                console.log(self.state);
                self.setState({
                    showSpinner: false,
                    showMessage: "block",
                    message: response.data.status
                });
                

                

              //  window.location.reload(); 
               
                console.log(response);
            })
            .catch(function (error) {
                console.log(self.state);
                self.setState({
                    showSpinner: false,
                    showMessage: "block",
                    message: "Server under maintainance, try again later or contact backend team for the updates"
                });
            });
          
        }
    }

   
    fileHandler = (event) => {
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                this.setState({
                    cols: "",
                    rows: "",
                    uploadedFlag: false
                });
            }
            else {
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows,
                    uploadedFlag: true
                });
            }
        });
    }

    createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info(`${this.state.pending}`);
              break;
            case 'success':{
              NotificationManager.success( 'Message',`${this.state.message}`);
              const options = { 
                title: 'Message', 
                subtitle: 'Total', 
                body: `${this.state.message}`, 
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
              break;
            }
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
                  break;
                  default:
    
          }
        };
      };
      

    render() {
        //this.createNotification('success')
  
        
        console.log(this.state.cookie);
        let displayUploadedData = [];
        let data = [];
        for (let i = 1; i < this.state.rows.length; i++) {
            if (!this.state.rows[i][0]) break;
            data.push(
                <tr>
                    <td>{this.state.rows[i][0]}</td>
                    <td>{this.state.rows[i][1]}</td>
                </tr>
            );
        }
        if (this.state.uploadedFlag) {
            displayUploadedData.push(
                <div>
                    <Table stripped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </Table>
                    {/* <Button  onClick={() => this.createExam()} size="lg">Create Exam</Button>{' '} */}
                    <div style={{ borderStyle: "inset", height : "80px", background: "#4863A0"}} onChange={this.onChangeValue}>
                        <center><h3 style={{color:"White" , paddingLeft:"70px"}}>Select a Exam Type</h3>
                        <h4 style={{color:"White"}}>
                        <input type="radio" value="mcq" name="mcq"  /> MCQ Exam
                        <span style={{ marginLeft :"20px", marginRight : "20px" }}>|</span>
                        <input type="radio" value="written" name="mcq"  /> Written Exam
                        <span style={{ marginLeft :"20px", marginRight : "20px" }}>|</span>
                        <input type="radio" value="both" name="mcq"  /> Both
                        </h4>
                        </center>
                    </div>
                    <br />
                    {/*Upload PDF File
                    <div style={{ borderStyle: 'solid', borderColor:"#F5F5F5" ,padding:"10px" , borderRadius:"5px"  }}>
                   
                    <FormGroup>
                        <Input type="file" name="pdf" id="pdf" placeholder="UPLOAD PDF FILE" required/>
                    </FormGroup>
                    </div>
                    <br />
                    <FormGroup>
                        <Label for="formLink">Form Link</Label>
                        <Input type="url" name="formLink" id="formLink" placeholder="form link" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="subjectName">Subject Name</Label>
                        <Input type="text" name="subjectName" id="subjectName" placeholder="subject name" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examDate">Exam Date</Label>
                        <Input type="date" name="examDate" id="examDate" placeholder="exam date" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="duration">Duration</Label>
                        <Input type="number" step="0.01" name="duration" id="duration" placeholder="duration" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description(Optional)</Label>
                        <Input type="text" name="description" id="description" placeholder="description" />
                    </FormGroup>
                    <center><Button color="success" onClick={() => this.createExam()} size="lg" color="primary">Create Exam</Button></center>
                    
                    <center>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.showSpinner}
                        />
                        <p style={{ display: this.state.showMessage }}>{this.state.message}</p>
                    </center>
                    */}

                </div>
            );
        }

        if(this.state.name==="mcq")
        {
            
            displayUploadedData.push(
            <div>
                
            <FormGroup>
           
                        <Label for="formLink">Form Link</Label>
                        <Input type="url" name="formLink" id="formLink" placeholder="form link" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="subjectName">Subject Name</Label>
                        <Input type="text" name="subjectName" id="subjectName" placeholder="subject name" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examDate">Exam Date</Label>
                        <Input type="date" name="examDate" id="examDate" placeholder="exam date" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="duration">Duration</Label>
                        <Input type="number" step="0.01" name="duration" id="duration" placeholder="duration" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description(Optional)</Label>
                        <Input type="text" name="description" id="description" placeholder="description" />
                    </FormGroup>
                    <center><Button color="success" onClick={() => {this.createExam()}} size="lg" color="primary">Create Exam</Button></center>
                    
                    <center>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.showSpinner}
                            onChange={this.createNotification('success')}
                        />
                        <p style={{ display: this.state.showMessage }}>{this.state.message}</p>
                    </center>
            </div>
            );
        }

        if(this.state.name==="written")
        {
            displayUploadedData.push(
            <div>
                    Upload PDF File
                    <div style={{ borderStyle: 'solid', borderColor:"#F5F5F5" ,padding:"10px" , borderRadius:"5px"  }}>
                    <FormGroup>
                        <Input type="file" name="id" id="pdf"  onChange={this.fileUpload} placeholder="UPLOAD PDF FILE" required/>
                    </FormGroup>
                    </div>
                    <br />
                    <FormGroup>
                        <Label for="subjectName">Subject Name</Label>
                        <Input type="text" name="subjectName" id="subjectName" placeholder="subject name" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examDate">Exam Date</Label>
                        <Input type="date" name="examDate" id="examDate" placeholder="exam date" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="duration">Duration</Label>
                        <Input type="number" step="0.01" name="duration" id="duration" placeholder="duration" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description(Optional)</Label>
                        <Input type="text" name="description" id="description" placeholder="description" />
                    </FormGroup>
                    <center><Button color="success" onClick={() => this.createExam()} size="lg" color="primary">Create Exam</Button></center>
                    
                    <center>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.showSpinner}
                        />
                        <p style={{ display: this.state.showMessage }}>{this.state.message}</p>
                    </center>
            </div>
            );

            
        }

        if(this.state.name==="both")
            {
                displayUploadedData.push(
                <div>
                        
                        <br />
                        <FormGroup>
                            <Label for="formLink">Form Link</Label>
                            <Input type="url" name="formLink" id="formLink" placeholder="form link" required/>
                        </FormGroup>
                        Upload PDF File
                        <div style={{ borderStyle: 'solid', borderColor:"#F5F5F5" ,padding:"10px" , borderRadius:"5px"  }}>
                        <FormGroup>
                            <Input type="file" name="pdf" id="pdf" placeholder="UPLOAD PDF FILE" required/>
                        </FormGroup>
                        </div>
                        <br />
                        <FormGroup>
                            <Label for="subjectName">Subject Name</Label>
                            <Input type="text" name="subjectName" id="subjectName" placeholder="subject name" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examDate">Exam Date</Label>
                            <Input type="date" name="examDate" id="examDate" placeholder="exam date" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="duration">Duration</Label>
                            <Input type="number" step="0.01" name="duration" id="duration" placeholder="duration" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description(Optional)</Label>
                            <Input type="text" name="description" id="description" placeholder="description" />
                        </FormGroup>
                        <center><Button color="success" onClick={() => this.createExam()} size="lg" color="primary">Create Exam</Button></center>
                        
                        <center>
                            <ClipLoader
                                size={50}
                                color={"#123abc"}
                                loading={this.state.showSpinner}
                            />
                            <p style={{ display: this.state.showMessage }}>{this.state.message}</p>
                        </center>
                </div>
                );
            }
        return (
            <Fragment>
                <div className="wrapper">
                    <FacultyHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/faculty"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                <BreadcrumbItem active> Create Exam</BreadcrumbItem>
                            </Breadcrumb>
                            <hr />
                        </div>
                        <Jumbotron>
                            <div>
                                <h2>Follow the steps to create exam</h2>
                                <p style={{ fontSize: 15 }}>
                                    1. Download the sample excel file to add a student for exam<br />
                                    2. Edit the downloaded file as per the file formats<br />
                                    3. Upload the final file<br />
                                    4. Create a google form for MCQ type examination <a onClick={() => shell.openExternal("http://forms.google.com/")} className="article"> CLICK HERE</a><br />
                                    5. Add the form link below<br />
                                    6. Upload a PDF file for written examination.<br />
                                    7. Hit Genearte Exam<br />
                                    8. Wait for sometime until exam created...<br />
                                </p>
                            </div>

                           
                        </Jumbotron>


                        <ul className="list-unstyled CTAs">
                            <li><a onClick={() => shell.openExternal("https://docs.google.com/spreadsheets/d/1qcM8cvn09nIuT2Eumr-78cn3n-aCKScUDcIzFcCVQII/edit?usp=drivesdk")} className="article">Download sample document</a></li>
                            <div style={{ borderStyle: 'dashed' }}><center><h3>Upload File</h3></center><input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} /></div>
                        </ul>
                        {displayUploadedData}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CreateExam;
