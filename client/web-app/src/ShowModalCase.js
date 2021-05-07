import Axios from 'axios';
import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';
import FadeLoader from 'react-spinners/FadeLoader';


export default class ShowModalCase extends React.Component {
    constructor() {
        super();
        this.state = {
            textarea: '',
            spinner : false
        }
    }

    handleInputChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value.trim(),
        });
    }

    sendValues = (event) => {
        event.preventDefault();
        const details = {
            textarea: this.state.textarea,
            email: this.props.email
        }
        
        // alert("inside if")
        if (this.props.header === "Application Rejected") {
            this.setState({
                spinner : true
            })
            Axios.post("http://localhost:5000/app/rejection", { details })
                .then(res => {
                    alert(res.data.statusMessage);
                    this.setState({
                        textarea: ''
                    });
                    this.setState({
                        spinner : false
                    })
                    window.location.reload(); 
                })
                .catch((err) => {
                    alert(err.response.data.error);
                })
        }
        else {
            this.setState({
                spinner : true
            })
            Axios.post("http://localhost:5000/app/confirmation", { details })
                .then(res => {
                    alert(res.data.statusMessage);
                    this.setState({
                        textarea: ''
                    });
                    this.setState({
                        spinner : false
                    })
                    window.location.reload(); 
                })
                .catch((err) => {
                    alert(err.response.data.error);
                });
        }


        // if (/^[\w]*$/.test(this.state.textarea)) {

        // }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        {this.props.header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <center><FadeLoader loading = {this.state.spinner} size={60} /></center>
                    <Form>
                        <FormGroup>
                            <Label>Any Suggestions</Label>
                            <Input type="textarea" name="textarea" onChange={this.handleInputChange} />
                        </FormGroup>
                    </Form>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide} >Close</Button>
                    <Button type="submit" color="primary"
                        onClick={this.sendValues}
                    >Submit</Button>
                    
                </Modal.Footer>
            </Modal>
        )
    }
}