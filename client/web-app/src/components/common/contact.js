//import react from 'react';
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {useHistory} from "react-router-dom";
const { TextArea } = Input;


const AppContact = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
  const [result, setResult] = useState(null);

    const sendmail = event => {
            axios
            .post('http://localhost:5000/app/contact', { ...state })
            .then(response => {
                setResult(response.data);
                alert(response.data.statusMessage);
                //setResult(response.data);
                setState({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });

                Array.from(document.querySelectorAll("input")).forEach(
                        input => (input.value = '')
                )
                Array.from(document.querySelectorAll("TextArea")).forEach(
                        input => (input.value = '')
                )
                //console.log("Hello")
            })
    }

    const onInputChange = event => {
        const { name, value } = event.target;

        setState({
        ...state,
        [name]: value
        });
    };    
    
    //const history = useHistory();
    return(
        <div id="contact" className="block contactBlock">
            <div className="container-fluid">
                <div className="titleHolder">
                    <h2>Get In Touch</h2>
                    <p> You Can Conatct Us If You Need Any Information </p>
                </div>

                <Form
                onSubmit={e => e.preventDefault()}
                onFinish={sendmail}
                //onFinishFailed = {() => console.log("NOT")}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                >
                
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your Full Name!' }]}
                >
                    <Input name="name" placeholder="Full Name" onChange={onInputChange} />
                </Form.Item>
                
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    onChange={onInputChange}
                    />
                </Form.Item>

                <Form.Item name="subject">
                    <Input  name="subject" placeholder="Subject" onChange={onInputChange} />
                </Form.Item>

                <Form.Item name="message">
                    <TextArea name="message" placeholder="Message" onChange={onInputChange} />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" 
                     >
                    Submit
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    );
    
};
export default AppContact;