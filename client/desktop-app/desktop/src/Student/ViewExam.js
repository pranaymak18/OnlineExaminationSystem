import React, { Component, Fragment } from 'react';
import StudentHeader from './Header';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
const path = require('path');
const url = require('url');

const { remote , BrowserWindow , Menu } = window.require('electron');
 
const fs = require("fs");
const axios = require('axios');

class ViewExamss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            cookie : "",
            exams: "",
            examType:""
        }
        this.startExam = this.startExam.bind(this);
    }

    startExam(url1,url2) {
        //const remote = require('electron').remote;
        const BrowserWindow = remote.BrowserWindow;
        const win = new BrowserWindow({
          height: 600,
          width: 800,
          fullscreen : true,
          alwaysOnTop: true,
          webPreferences: {  enableRemoteModule: true ,webSecurity: false, nodeIntegration: true } 
        });
        win.setMenu(null);
       // let data= this.state.exams[3].examId;       
        //alert(data);
        //win.loadFile(url);
        if(url1 === "No mcq")
        {
           // alert("inside url2 "+ url2)
            //alert(url2);
            win.loadURL(`http://localhost:3000/scanner/${url2}/${this.state.cookie.email}`);
        }
       else {
         
        win.loadURL(url1);
       }
       
        //alert('Hello');
        
    }
    
    componentDidMount() {
        //alert(document.cookie);
        let temp = document.cookie.split(";");
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
        });

        this.setState({
            loader: true
        });

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

    render() {
        let showExams = [];
        if (this.state.exams === "") {
            showExams.push(
                <p>
                    Failed to fetch data.
                
                </p>
            );
        } else if (this.state.exams.length === 0) {
            showExams.push(
                <p>
                    No exam found!
                </p>
            );
        } else {
            for (let i = 0; i < this.state.exams.length; i++) {
                let color = "info";
                if (i % 2) color = "danger"
                
                //alert(this.state.exams[i].examId);
                showExams.push(
                    <Card body inverse color={color} style={{ margin: 10 }}>
                        <CardText>Subject Name : {this.state.exams[i].subjectName}</CardText>
                        <CardText>Exam Date : {this.state.exams[i].examDate}</CardText>
                        <CardText>Exam Duration : {this.state.exams[i].examDuration}</CardText>
                        <CardText>Exam Description : {this.state.exams[i].examDescription}</CardText>
                        <CardText>Exam Link : <button onClick={() => this.startExam(this.state.exams[i].formLink,this.state.exams[i].examId)}>START EXAM</button></CardText>
                    </Card>
                );
              
            }
        }
        return (
            <Fragment>
                <div className="wrapper">
                    <StudentHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/student"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
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

export default ViewExamss;