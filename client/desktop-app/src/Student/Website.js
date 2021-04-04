import React from 'react';
import Axios from 'axios';
export default class web extends React.Component {

    constructor() {
        super();
        this.state = {
            loader: false,
            cookie : "",
        }
        
    }
    
    componentDidMount() {

        let temp = document.cookie.split(";");
        
           // alert('In If');
            let email = temp[1].split("=")[1];
            let role = temp[2].split("=")[1];
            let orgId = temp[0].split("=")[1];
            //alert(email);
            this.setState({
                cookie : {
                    email : email,
                    role : role,
                    orgId : orgId,
                    exams : ""
                },
            });
        
    }
    render() {
        
        return (

            <>
                <div><h1>Upload Your File For Written Examination.</h1></div>
                <div>
                    <form>
                        <label>
                        Name :
                        <input type="text" name="naem" ></input>
                        </label>
                        <br />
                        <label>
                        Email ID : 
                        <input type="email" name='email' Value={this.state.cookie.email} disabled='true'/>
                        </label>
                        <br />
                        <label>
                        Upload Your File : 
                        <br />  
                        <input type="file" name='file' />
                        </label>
                    </form>
                </div>
            </>
        );

    }


}