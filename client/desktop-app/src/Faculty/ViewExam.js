import React, { Component, Fragment } from 'react';
import FacultyHeader from './Header';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Button from '@material-ui/core/Button';

import EditModals from './EditExam'
import Modals from './Modal'
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { red } from '@material-ui/core/colors';
const axios = require('axios');
const shell = window.require('electron').shell;
class ViewExams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            cookie : "",
            exams: "",
            show: false
        }
        this.deleteExam = this.deleteExam.bind(this)
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
                orgId : orgId,
                exams : ""
            },
            loader:true
        });
      //  alert(document.cookie)
     //   alert("in viewexam of faculty "+ email)
        let self = this;

        axios.post("http://localhost:5000/viewExam",{
            user : email
        })
        .then((Data) => {
            console.log(Data);
            self.setState({
                loader : false,
                exams : Data.data.exams[0].exam
            });
        })
        .catch((err) => {
            console.log(err)
            self.setState({
                loader: false
            });
        })
    }
    
    deleteExam(props){

            
            
           
          }
    

    render() {
        let showExams = [];
        if (this.state.exams === "" && this.state.loader===false) {
            showExams.push(
                <p>
                    Failed to fetch data.
                </p>
            );
        } else if (this.state.exams.length === 0 && this.state.loader===false) {
            showExams.push(
                <p>
                    No exam found!
                </p>
            );
        } else {
            for (let i = 0; i < this.state.exams.length; i++) {
                let color = "success";
                
                if (i % 2) color = "warning"
                if(this.state.exams[i].type==="mcq"){

                    showExams.push(
                        <Card body inverse color={color} style={{ margin: 10 }}>
                           
                            <CardText>Subject Name : {this.state.exams[i].subjectName}</CardText>
                            <CardText>Exam Date : {this.state.exams[i].examDate}</CardText>
                            <CardText>Exam Duration : {this.state.exams[i].examDuration}</CardText>
                            <CardText>Exam Description : {this.state.exams[i].examDescription}</CardText>
                            <CardText>Exam Link :<Button variant="contained" color="primary" className="article" onClick={() => shell.openExternal(this.state.exams[i].formLink)} >CLICK HERE</Button></CardText>
                            <CardText>Enter Exam Room : <Button variant="contained" color="primary" className="article" onClick={() => shell.openExternal(`https://zoomclone.harsh31.repl.co/room/${this.state.exams[i].examId}`)}>CLICK HERE</Button></CardText>
                            <CardText ><EditModals exam = {{type: "mcq",examId:this.state.exams[i].examId,formLink: this.state.exams[i].formLink,subjectName: this.state.exams[i].subjectName, examDate: this.state.exams[i].examDate, examDuration: this.state.exams[i].examDuration, examDescription: this.state.exams[i].examDescription, pdf: this.state.exams[i].pdf, pdfName:this.state.exams[i].pdfName }}/>     <Modals examId = {this.state.exams[i].examId}></Modals ></CardText><CardText style={{ float:'right'}}></CardText>
                        </Card>
                    );

                }
                else{
                showExams.push(
                    <Card body inverse color={color} style={{ margin: 10 }}>
                        <CardText>Subject Name : {this.state.exams[i].subjectName} <CardText style={{ float:'right'}}></CardText></CardText>
                        <CardText>Exam Date : {this.state.exams[i].examDate}</CardText>
                        <CardText>Exam Duration : {this.state.exams[i].examDuration}</CardText>
                        <CardText>Exam Description : {this.state.exams[i].examDescription}</CardText>
                        <CardText>Exam Link :<Button variant="contained" color="primary" onClick={() => window.open(`${this.state.exams[i].pdf}`)} className="article" >CLICK HERE</Button></CardText>
                        <CardText>View Response : <Button variant="contained" color="primary" href= {`http://localhost:3000/faculty/viewResponse/${this.state.exams[i].examId}`} className="article">CLICK HERE</Button></CardText>
                        <CardText>Enter Exam Room : <Button variant="contained" color="primary" className="article" onClick={() => shell.openExternal(`https://zoomclone.harsh31.repl.co/room/${this.state.exams[i].examId}`)}>CLICK HERE</Button></CardText>
                        <CardText style={{ float:'right'}}><EditModals exam = {{type: "written",examId:this.state.exams[i].examId,subjectName: this.state.exams[i].subjectName, examDate: this.state.exams[i].examDate, examDuration: this.state.exams[i].examDuration, examDescription: this.state.exams[i].examDescription, pdf: this.state.exams[i].pdf, pdfName:this.state.exams[i].pdfName }}/>    <Modals examId = {this.state.exams[i].examId}></Modals ></CardText>
                    </Card>
                );
                }
            }
        }
        return (
            <Fragment>
                <div className="wrapper">
                    <FacultyHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/faculty"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                <BreadcrumbItem active>All Exams</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.loader}
                        />
                        
                        {showExams}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ViewExams;
