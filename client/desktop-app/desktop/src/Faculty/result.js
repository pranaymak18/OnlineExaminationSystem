import React, { Component, Fragment } from 'react';
import FacultyHeader from './Header';
import Paper from '@material-ui/core/Paper';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';

const axios = require('axios');


class UploadResult extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loader: false,
            cookie : "",
            exams: ""
        }
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
        
        let self = this;

        axios.post("http://localhost:5000/viewExam",{
            user : email
        })
        .then((Data) => {
            //console.log(Data);
            self.setState({
                loader : false,
                exams : Data.data.exams[0].exam
            });
        })
        .catch((err) => {
            //console.log(err)
            self.setState({
                loader: false
            });
        })
    }

    fileUpload = e => {

        let files = e.target.files
        //alert(files);
        //console.log(files);

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (file) => {
            this.setState({
                file: file.target.result,
                fileName: files[0].name
            });
        }
        axios.post('')
        .then();

    }

    render()
    {
        let showExams = [];
        if (this.state.exams === "" && this.state.loader==false) {
            showExams.push(
                <p>
                    Failed to fetch data.
                </p>
            );
        }

        else if (this.state.exams.length === 0 && this.state.loader==false) {
            showExams.push(
                <p>
                    No exam found!
                </p>
            );
        } 

        else {
            for (let i = 0; i < this.state.exams.length; i++) {
                showExams.push(
                    <div>
                    <Paper elevation={3} style={ {backgroundColor : '#7386D5', padding: '3px'} } >
                        <h5 style={{marginLeft : '20px', marginTop:'20px' , color : 'white'}} >Subject Name : {this.state.exams[i].subjectName}</h5>
                        <h5 style={{marginLeft : '20px' , color : 'white'}}>Exam Date : {this.state.exams[i].examDate} </h5>
                        <div style={{padding : '10px'}}><input type="file"  style={{ "padding": "10px"}} onChange={this.fileUpload}></input></div>
                        <br />
                        
                    </Paper>
                    <br />
                    </div>
                );
            }
        }

        return(
            <>
                    <div className="wrapper">
                        <FacultyHeader />
                        <div id="content">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/faculty"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>Upload Result</BreadcrumbItem>
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
            </>
        );
    }
}



export default UploadResult;
