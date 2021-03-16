import React, { Component, Fragment } from 'react';
import FacultyHeader from './Header';
import {Breadcrumb, BreadcrumbItem, Button,ListGroup, ListGroupItem , Badge} from 'reactstrap'
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
//import BackButton from "../BackButton"
import { Document, Page, pdfjs } from "react-pdf";
//import { PDFDownloadLink, Text, View, StyleSheet } from '@react-pdf/renderer'
//import DownloadLink from "react-download-link";
import history from '../history'

const path = require('path');
const url =require('url');

const { remote , BrowserWindow , Menu } = window.require('electron');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

 
const fs = require("fs");
const axios = require('axios');
const shell = window.require('electron').shell;

class ViewResponse extends Component {
    constructor(props) {
        super(props);
        const { id } = props.match.params;
        //alert("In Constructor"+id);
        this.state = {
            id : id,
            answersheet : "",
            flag : false,
            showspinner : false
        }

        this.handleUrlRedirect = this.handleUrlRedirect.bind(this);
    //   this.getDataFromURL = this.getDataFromURL.binf(this)
        this.viewpdf = this.viewpdf.bind(this)
        this.download =this.download.bind(this)
        this.back = this.back.bind(this)
    }


  
    
    
    componentDidMount(){
        const id = this.state.id;
        //alert(id);

          
        this.setState({
            showspinner: true,
          })

        axios.post('http://localhost:5000/AnswerSheet',{ id })
        .then((Data) =>  { 
            if(Data.data.statusMessage){
                alert(Data.data.statusMessage)
            } 
            alert( Data.data.answers[0].students[0].pdf)  
            this.setState({
                
                answersheet : Data.data.answers[0].students,             
                flag : true,
                showspinner: false
            })                      
               
                
            alert("answersheet "+ this.state.answersheet[0])
        })
    }

    viewpdf(url){           

        const BrowserWindow = remote.BrowserWindow;
        const win = new BrowserWindow({
          height: 600,
          width: 800,
         
          webPreferences: {  enableRemoteModule: true ,webSecurity: false, nodeIntegration: true } 
        });

       alert("url is " + url)
        win.loadURL(`http://localhost:3000/faculty/showanswersheet/${url}/${this.state.id}`);
    }
    

    download (pdf,name) {
        alert("download")
    const linkSource = pdf;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    }

    handleUrlRedirect = (url) => () => {
        shell.beep();
        
        shell.openExternal(url);
    }

    back(){
        history.push('/faculty/viewExam')
    }
  

    render() {
       
        
        
        let renderData = [];
        if(this.state.flag)
        {
           
            for (let i = 0; i < this.state.answersheet.length; i++) {
           
                renderData.push(
                            <ListGroupItem> <p>Name : {this.state.answersheet[i].studentName} </p>
                                            <p>email : {this.state.answersheet[i].studentEmail}</p>
                                           <p> <button onClick={() => this.viewpdf(this.state.answersheet[i].studentEmail,this.state.answersheet[i].examId)}>View Answersheet</button></p>
                                           <p> <Button onClick={()=>this.download(this.state.answersheet[i].pdf,this.state.answersheet[i].pdfName)}><i class="fa fa-download" ></i>download</Button></p>
                                           
                            </ListGroupItem>
                    
                );
            }
            
        }
        else{
            renderData.push(<h3>Data Loading...</h3>);
        }
        return (
            <>
                <div className="wrapper">
                    <FacultyHeader />
                    
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                <BreadcrumbItem><Link to="/faculty/viewExam"><i className="fa fa-home fa-sm"></i>All Exams</Link></BreadcrumbItem>
                                <BreadcrumbItem active> View Responses</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>View Responses</h3>
                                <hr />
                            </div>
                        </div>
                
                        <ListGroup>
                            {renderData}
                        </ListGroup>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.showspinner}
                        />
                  
                    </div>
                   
                </div>
            </>
          );

    }
}

export default ViewResponse;