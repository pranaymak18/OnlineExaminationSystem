import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ClipLoader from "react-spinners/ClipLoader";

import axios from 'axios';
import { Button } from "reactstrap";
import './pdf-style.css';
var QRCode = require('qrcode.react');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function AllPages(props) {
  
  const [numPages, setNumPages] = useState(null);
  const [Count, setCount] = useState(0);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
  /*let id = props.id
  let pdfdata
  
  axios.post('http://localhost:5000/app/pdf',{id })
  .then((Data) =>  {    
    pdfdata = Data.data.pdf ; 
   // encP = pdfdata.split(';base64,').pop()
    alert("in singlepage "+ pdfdata )
   
  })
  
*/
 alert("in singlepage-------- "+ props.pdf )
  
  //const { pdf } = props.pdf;
  
  //alert("In Single"+ pdf);
  const ShowQR = () => { 
    //alert("In QR");
    setCount(1);
  }

 

 
  return (
    <>
    <Document
      file={props.pdf}
      options={{ workerSrc: "/pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1.5}/>
      ))}
    </Document>
    <br />
    
   
  </>
  );
}