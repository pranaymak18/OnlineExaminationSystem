
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import samplePDF from './Paper.pdf';
import AllPages from './SinglePage';
import './pdf-style.css';

export default function Pdf(props) {

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