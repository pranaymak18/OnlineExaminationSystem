import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "reactstrap";
var QRCode = require('qrcode.react');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function AllPages(props) {
  const [numPages, setNumPages] = useState(null);
  const [Count, setCount] = useState(0);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { pdf } = props;
  const ShowQR = () => { 
    //alert("In QR");
    setCount(1);
  }

  const RenderData = () => {
    //alert("In Fun");
    if(Count==0)
    { 
      //alert("In If");
      return(
      <div>
      
      <Button onClick={ShowQR}>Submit</Button>
      
      </div>
      );
    }
    else{
      let temp = document.cookie.split(";");  
      let email1 = temp[0].split("=")[1];
      let role = temp[1].split("=")[1];
      let orgId = temp[2].split("=")[1];
      return( 
      <div>
      <QRCode
      value={`http://192.168.43.112:3001/scanner/${email1}`}
      size={128}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      includeMargin={true}
      renderAs={"svg"}
      />
      </div>
      );
      }

  }
  return (
    <>
    <Document
      file={pdf}
      options={{ workerSrc: "/pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
    <br />
    <center>
  
    {
    RenderData()
    }    
      </center>
  </>
  );
}