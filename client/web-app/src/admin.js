import React from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import dashboard from './dashboard'
import Cookies from 'js-cookie';


export default class admin extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (/^([\w\d](\.)*)+\@([\w\.]{1,2})+(\w)$/.test(this.state.email)) {
            if ((this.state.password.length > 5)) {
                let admin_users = {
                    email: this.state.email,
                    password: this.state.password,
                    status: true
                };
                Axios.post('http://localhost:5000/app/signin',  {admin_users} )
                    .then(response => {                        
                        if (response.data.role !== "super") {
                            alert("You are NOT ADMIN");
                        }
                        else {
                            alert(response.data.statusMessage);
                            // Cookies.set(this.state.email, this.state.passwd, {expires: 1});
                            
                            this.props.history.push('./dashboard')
                            this.State = {
                                email: '',
                                password: ''
                            };
                            Array.from(document.querySelectorAll("input")).forEach(
                                input => (input.value = '')
                            );
                        }


                    })
                    .catch((err) => {
                        alert(err.response.data.error);
                    });
            }
            else {
                alert("Minimum Password Length Is 6");
            }
        }
        else {
            alert("Enter Proper Mail ID");
        }
    }

    render() {
        return (
            <div style={{ flex: 1 }}>
                <Container style={{ border: '12vh', borderColor: 'black', borderWidth: '12vh' }}>
                    <h2>Admin Login</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange} />
                        </FormGroup>

                        <Button type="submit" color="primary" >Login</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}