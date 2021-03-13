import React, { Component, Fragment } from 'react';
import FacultyHeader from './Header';
import { ListGroup, ListGroupItem , Badge} from 'reactstrap'

import { Document, Page, pdfjs } from "react-pdf";
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
        //alert(id);
        this.state = {
            id : id,
            answersheet : "",
            flag : false
        }
    }

    componentDidMount(){
        const id = this.state.id;
        //alert(id);

        axios.post('http://localhost:5000/app/AnswerSheet',{ id })
        .then((Data) =>  {    
            this.setState({
                answersheet : Data.data.answersheet,
                flag : true
            })
        })
    }

    
    render() {
        function viewpdf(){
            
        }
        let renderData = [];
        if(this.state.flag)
        {
            for (let i = 0; i < this.state.answersheet.length; i++) {
                renderData.push(
                            <ListGroupItem> <p> Name : {this.state.answersheet[i].name} </p>
                                            <p>Name : {this.state.answersheet[i].email}</p>
                                           <p><Badge href="#" color="success" onClick={viewpdf(this.state.answersheet[i].pdf)} ><h5>View AnswerSheet</h5></Badge></p>
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
                        <ListGroup>
                            {renderData}
                        </ListGroup>
                    </div>
                </div>
            </>
          );

    }
}

export default ViewResponse;