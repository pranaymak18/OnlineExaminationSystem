import React, { Component, useState } from "react";
import { Document, Page } from "react-pdf";
import ClipLoader from "react-spinners/ClipLoader";
import AllPages from './SinglePage';
import {Jumbotron} from 'reactstrap'
import './pdf-style.css';
import axios from "axios";
import Timer from 'react-compound-timer'
import { displayName } from "qrcode.react";
var QRCode = require('qrcode.react');

export default class ShowAnswersheet extends Component{
  
  constructor(props)
  {
    super(props);
    const { data,examId } = props.match.params;
    alert("email in showanswersheet.js "+ data); 
    this.state = {
      pdf : "",
      id : data ,
      examId: examId,
      flag : false,
      timer : true,
      showSpinner: false,
      
     
    }
    
  }

  componentDidMount(){
    let pdfdata;
    
     
    const getAnswersheet={
      email : this.state.id,
      eid : this.state.examId

    }
    alert("in show answersheet id is "+ getAnswersheet.eid)
    //alert(id);
    //let r=0;
    this.setState({
      showSpinner: true,
    })
    axios.post('http://localhost:5000/app/showanswersheet',getAnswersheet )
    .then((Data) =>  {    
      //pdfdata = Data.data.pdf ; 
    // encP = pdfdata.split(';base64,').pop()
      //alert("in written post "+ pdfdata )
    //  alert("pdfdata "+Data.data.pdf[0].studentEmail+" length "+  Data.data.pdf.length)

      for(var i=0; i<Data.data.pdf.length;i++){
        if(Data.data.pdf[i].studentEmail === this.state.id)
        {
          alert("if stuemail"+ Data.data.pdf[i].studentEmail+" pdfname "+Data.data.pdf[i].pdfName)
          this.setState({
            pdf :Data.data.pdf[i].pdf,
            showSpinner:false

          })
          
          alert("this.pdf forloop"+this.state.pdf)
        }
          
        else{
          
        }
      

        
      }
      
      
    })
    
    
    
  }
  //alert(props.match.params)
  
  render(){


    
      //alert(this.state.pdf)
   return(
        <div>
        <div className="App">
                        
      <center><h4><input type="text" value={this.state.id}/></h4></center>
      <div className="all-page-container">
      <center>
                        <ClipLoader
                            size={50}
                            color={"#123abc"}
                            loading={this.state.showSpinner}
                        />
                       {/* <p style={{ display: this.state.showMessage }}>{this.state.message}</p>*/ }
       </center>        
        <AllPages pdf={this.state.pdf}  />
      </div>
      
      </div>
      </div>
        
      )  
    
   
  
}
}