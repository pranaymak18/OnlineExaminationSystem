import React, { Component, Fragment } from 'react';
import StudentHeader from './Header';
import { ListGroup, ListGroupItem , Badge} from 'reactstrap'
const { remote , BrowserWindow , Menu } = window.require('electron');

 
const fs = require("fs");
const axios = require('axios');
const shell = window.require('electron').shell;
class ViewResponse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="wrapper">
                    <StudentHeader />
                    <div id="content">
                        <ListGroup>
                        <ListGroupItem><Badge href="#" color="success" onClick={() => shell.openExternal(alert("PDF Will Open"))} ><h5>Pranay Makwana</h5></Badge></ListGroupItem>
                        <ListGroupItem>Harsh Mayavanshi</ListGroupItem>
                        <ListGroupItem>Morbi leo risus</ListGroupItem>
                        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                        <ListGroupItem>Vestibulum at eros</ListGroupItem>
                        </ListGroup>  
                    </div>
                </div>
            </>
          );

    }
}

export default ViewResponse;