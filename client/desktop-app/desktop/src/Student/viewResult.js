import React, { Component, Fragment,useState } from 'react';
import StudentHeader from './Header';
import { Table } from 'reactstrap';
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';

const axios = require('axios');

class ViewResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader : true,
            exam : ""
        }
    }

    componentDidMount()
    {
        axios.post('')
        .then()
        alert("Hello");
        this.setState({
            loader : false
        })
    }

    render()
    {
        let renderData = [];
        if(this.state.loader == false)
        {
            let data = [];
            for (let i = 1; i <3; i++) {
                data.push(
                    <tr>
                        <td>1</td>
                        <td>SDP</td>
                        <td>Written</td>
                        <td>34</td>
                        <td>21/11/2000</td>
                    </tr>
                );
            }
            renderData.push(
                <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subject Name</th>
                        <th>Exam Type</th>
                        <th>Marks</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </Table>
            );
        }
        else
        {

        }
        return(
         <>
                <div className="wrapper">
                        <StudentHeader />
                        <div id="content">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/student"><i className="fa fa-home fa-sm"></i> Dashboard</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>View Result</BreadcrumbItem>
                                </Breadcrumb>
                            </div>
                            <ClipLoader
                                size={50}
                                color={"#123abc"}
                                loading={this.state.loader}
                            />
                            {renderData}
                        </div>
                    </div>
         </>   
        )
    }
}

export default ViewResult;
