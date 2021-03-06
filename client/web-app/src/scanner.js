import React from 'react';
import Axios from 'axios';
export default class web extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            maile:'',
            examId:''
        }
        
    }
    
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState(() => ({
            email : params.email
         }))
        //userData = params.email; 
        
        
    }
    render() {
        
        return (

            <>
                <div><h1>Upload Your File For Written Examination.</h1></div>
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
            </>
        );

    }


}