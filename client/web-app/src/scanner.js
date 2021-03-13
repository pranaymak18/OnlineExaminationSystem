import React from 'react';
import axios from 'axios';
import {Jumbotron} from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export default class web extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            maile:'',
            examId:'',
            name:''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChangeValue = (event) => {
        //alert(event.target.value);
            
            this.setState({
                name : event.target.value
            })
        }

    fileUpload = e => {

        let files = e.target.files
        // console.log(files);

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (file) => {
            this.setState({
                pdf: file.target.result,
                pdfName: files[0].name
            });
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault()

     //   let studentname = document.getElementById("stu_name").value

     if ((this.state.name === '') || (this.state.pdf === '')||(this.state.pdfName ==='') ) {
        alert("Enter All Details! ");
    }
    else{
      
        let AnswerSheet ={
            examId:this.state.examId,
            studentName: this.state.name,
            studentEmail: this.state.email,
            pdf: this.state.pdf,
            pdfName: this.state.pdfName,
        }
        //alert(AnswerSheet)


    //  alert("examId "+AnswerSheet.examId+" studentName "+AnswerSheet.studentName+" studentEmail "+AnswerSheet.pdfName)
        
    axios.post('http://192.168.43.39:5000/app/answersheet',AnswerSheet)
    .then( (Response)=>{
        alert(Response.data.statusMessage)

        this.setState(() =>( {
            maile:'',
            examId:'',
            name:''
        }))
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = '')
        )
    })
}

    }
    
    componentDidMount() {
        const { match: { params } } = this.props;
        //alert(params.id);
        this.setState(() => ({
            email : params.email,
            examId : params.id
         }))
        //userData = params.email; 
    }
    render() {
        //alert(this.props.params);
        return (

            <>
                <div className="container-fluid">
                    <div className="header">
                    <div className="logo">
                        <i class="fas fa-bolt"></i>
                        <a href="./">Secure Exam System</a>
                    </div>
                    </div>
                </div>
                <Jumbotron>
                    <div>
                        <h1>Welcome Students</h1>
                            <p>
                                1. Here You can upload a PDF file for your written examination.
                                <br />
                                2. File must be in pdf formate.
                                <br />
                                3. Check your email-id before uploding a file.
                            </p> 
                    </div>
                </Jumbotron>
                <Form onSubmit={ this.handleSubmit}>
                    <FormGroup row>
                    <Col md={6}>
                         <FormGroup>
                         <Label for="Student">Name</Label>
                         <Input type="text" name="stu_name" id="student"  onChange={this.onChangeValue}/>
                          </FormGroup>
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                        <Input type="email" name="email" id="exampleEmail" value={this.state.email} disabled='true'/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleFile" sm={2}>File</Label>
                        <Col sm={10}>
                        <Input type="file" name="pdffile" id="pdf"  onChange={this.fileUpload}/>
                        <FormText color="muted">
                            Upload a file in PDF formate.
                        </FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col>
                        {/*sm={{ size: 50, offset: 2 }}*/}
                        <Button color="primary" size="lg" block>Submit</Button>
                        </Col>
                    </FormGroup>
                    </Form>

                {/*
                <div>
                    <form>
                        <label>
                        Name :
                        <input type="text" name="name" ></input>
                        </label>
                        <br />
                        <label>
                        Email ID : 
                        <input type="email" name='email' Value={this.state.email} disabled='true'/>
                        </label>
                        <br />
                        <label>
                        Upload Your File : 
                        <br />  
                        <input type="file" name='file' />
                        </label>
                    </form>
                </div>
    */}
            </>
        );

    }


}