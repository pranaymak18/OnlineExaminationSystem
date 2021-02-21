import React ,{ Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Form, FormGroup, Label, Input, Jumbotron, Media } from 'reactstrap';
import { deflate } from 'zlib';
import './login.css';
import logo from './1.png';
import { Stream } from 'stream';
import history from './history';
import { Redirect } from 'react-router-dom';
//const fs = require("electron").remote.require("fs")
const electron = window.require("electron")
const axios = require('axios');
const shell = window.require('electron').shell;
// require('electron-cookies');
const path = require('path');
const fs = require('fs');
/*global Android*/
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleUrlRedirect = this.handleUrlRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        toAdminDashboard: false,
        toFacultyDashboard: false,
        toStudentDashboard: false,
      }

    handleUrlRedirect = () => () => {
        //shell.beep();
        //shell.openExternal('https://github.com');
    }

    handleSubmit = (event) => {
        
        event.preventDefault();
        let email1 = document.getElementById("email").value;
        let password1 = document.getElementById("password").value;

        if (email1 === "" || password1 === "") {
            alert("Email and Password are mandatory fields");
        } else {
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if(emailPattern.test(email1)) {
                
            let admin_users = {
                email: email1,
                password: password1,
                
            };
            
            axios.post("http://localhost:5000/app/signin", {admin_users})
            .then((data) => {
                
                if(data.data.role==="admin") {
                    alert("Hi I am in admin")
                    document.cookie = 'email='+data.data.email;
                    document.cookie = 'role='+data.data.role;
                    document.cookie = 'orgId='+data.data.orgId;
                     this.setState(() => ({
                        toAdminDashboard: true
                      }))
                } else if(data.data.role==="student") {
                    document.cookie = 'email='+data.data.email;
                    document.cookie = 'role='+data.data.role;
                    document.cookie = 'orgId='+data.data.orgId;
                    history.push("/student");  
                    this.setState(() => ({
                        toStudentDashboard: true
                      })) 
                } else if(data.data.role==="faculty") {
                    document.cookie = 'email='+data.data.email;
                    document.cookie = 'role='+data.data.role;
                    document.cookie = 'orgId='+data.data.orgId;
                    history.push("/faculty");
                    this.setState(() => ({
                        toFacultyDashboard: true
                      }))
                } else {
                    alert("You are super admin use your web portal for login");
                }
            })
           


            } else {
                alert("Email is not in valid format!")
            }
        }
  }

    render() {
        if (this.state.toAdminDashboard === true) {
            return <Redirect to='/admin' />
          }
         
        return (
            <>
            <div id="pr">
            <Jumbotron fluid id="pr">
            {/* <Media>
                <Media right>
                    <Media object src={logo} alt="Generic placeholder image" />
                </Media>
                <Media body>
                    <Media heading>
                    <h1>Welcome To Examination Room!</h1>
                    </Media>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </Media>
            </Media>*/ }
                <h1 className="display-3">Welcome To Examination </h1>
                <h1 className="display-3">Room! </h1>
                <p>This is your virtual examination room.</p>
                <hr id="ir"></hr>
                <p>Login to Continue...</p>
                <p className="lead">
                <Button color="primary" onClick={this.handleUrlRedirect()} >Learn More</Button>
                </p>
            </Jumbotron>
            </div>
            <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Email" id="email"/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" placeholder="Password" id="password"/>
                </FormGroup>
                <FormGroup>
                    <Button className="btn-lg btn-dark btn-block">Log In</Button>
                </FormGroup>
                <div className="text-center">
                    <a href="http://localhost:3001/">Sign Up</a>
                    <spam className="p-2"> | </spam>
                    <a href="/forgot.js">Forgot Password</a>
                </div>
            </Form>
            </>
        )
    }
}
