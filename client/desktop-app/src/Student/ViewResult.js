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
            exams : "",
            marks:[],
            finish:false,
            cookie:""
        }

        this.showMarks = this.showMarks.bind(this)
    }


    showMarks(examId){


       // alert("showmarks exams length"+this.state.exams.length)

           
    }
    

    componentDidMount()
    {
        let examId =[]
        let temp = document.cookie.split(";");
        let email = temp[0].split("=")[1];
        let role = temp[1].split("=")[1];
        let orgId = temp[2].split("=")[1];
        this.setState({
            cookie : {
                email : email,
                role : role,
                orgId : orgId,
            },
        });
       // alert(email)
        axios.post("http://localhost:5000/viewExam",{
            user : email
        })
        .then((Data) => {
            console.log(Data);
            this.setState({
                loader : false,
                finish:false,
                exams : Data.data.exams[0].exam
            });

            for(let i=0;i<this.state.exams.length;i++)
            {
                let student = {
                    examId:this.state.exams[i].examId,
                    email: this.state.cookie.email
                }
        
                   
                axios.post("http://localhost:5000/ViewResult",{student})
                .then((response)=>{
                  // alert( response.data.result[0].students.length)
                    if(response.data.result[0] !== undefined && response.data.result[0].students.length !== 0){
                      //  alert(response.data.result[0].examId)
                            for(var i=0;i<response.data.result.length;i++){
                                if(response.data.result[0].students[i].studentEmail === this.state.cookie.email)
                                {
                                  //  alert("marks is "+response.data.result[i].students[i].marks)
                                   // this.setState({
                                     //   marks: response.data.result[i].students[i].marks
                                    //})
                                    this.state.marks.push(response.data.result[i].students[i].marks)
                                   // alert("marks "+this.state.marks)
        
                                } 
                                else{
                                    this.state.marks.push('0')
                                }           
                         }
                     }
                     else
                     {
                       //  alert("Marks hasn't been uploaded yet")
                       this.state.marks.push('0')
                      // alert("length of marks"+this.state.marks.length)
                     //  alert("length of marks"+this.state.marks)

                     }

                     this.setState({
                         finish : true
                     })
             })
        
        
            }
        
                   

        })
        .catch((err) => {
            console.log(err)
            this.setState({
                loader: false
            });
        })
       
        
    }

   
    render()
    {
        let renderData = [];
        if(this.state.loader === false && this.state.finish ===true)
        {
            let data = [];
         
            
            
            for (let i = 0; i <this.state.exams.length; i++) {
                
                data.push(
                    <tr>
                        <td>{i+1}</td>
                        <td>{this.state.exams[i].subjectName}</td>
                        <td>{this.state.exams[i].examDescription}</td>
                        <td>{this.state.marks[i]}</td>
                        <td>{this.state.exams[i].examDate}</td>
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

            //alert("render exam length "+this.state.exams.length)
            if(this.state.loader===false)
            renderData.push(<h2>No results found!</h2>)

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
                            {}
                            {renderData}
                        </div>
                    </div>
         </>   
        )
    }
}

export default ViewResult;