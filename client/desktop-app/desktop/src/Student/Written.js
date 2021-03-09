
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import samplePDF from './Paper.pdf';
import AllPages from './SinglePage';
import './pdf-style.css';
import axios from "axios";

export default function Pdf(props) {
  //alert(props.match.params)
  const { data } = props.match.params;
  alert(data); 
  axios.get('http://localhost:5000/app/pdf',{id : data})
  .then((Data) =>  {
    samplePDF=Data.data.exam.pdf;
  })
  return (
    <div className="App">
      {/*<h4>Single Page</h4>
      <SinglePagePDFViewer pdf={samplePDF} />

      <hr />
    */}
      <center><h4>Take Your Exam</h4></center>
      <div className="all-page-container">
        <AllPages pdf={samplePDF} />
      </div>
     
      <hr />
    </div>
  );
}