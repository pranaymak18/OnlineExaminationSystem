import react from 'react';
import signup from '../../signup';
import index from '../../index';
import { Carousel, Button } from 'antd';
import {useHistory} from "react-router-dom";
//import logo from './logo.svg';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';
import logout from '../../logout';


const items = [
    {
        key: '1',
        title: 'Online Exam',
        content: 'Online examination is conducted on web-enabled devices like laptops and desktop computers. An online examination software which uses google form to conduct examination from desktop app with 3 different roles admin who register organization with this system and add faculties and students, faculty who create exams and specific students and last student who will give the examination',
    },
    {
        key: '2',
        title: 'Second Page',
        content: 'Hello World 2',
    },
    {
        key: '3',
        title: 'Third Page',
        content: 'Hello World 3',
    }


]

function AppHero(){
    const history = useHistory();
    //function onNavigateSignup(){
    //            this.props.history.push('/signup');
    //}

    return(

       
        <div id="hero" className="heroBlock">
            <Carousel>

                {

                    items.map( item => {
                        return (
                            <div className="container-fluid">
                                <div className="content">
                                    <h3> {item.title}</h3>
                                    <p>{item.content}</p>
                                    <div className="btnHolder"> 
                                        <Button type="primary" onClick={() => history.push('/signup',{ from : "index" })} >Register Your Organization</Button>
                                        <br />
                                         <br />
                                        <Button><i class="fas fa-desktop"> </i>Watch Demo</Button>
                                    </div>
                                </div>
                            </div>
                        );

                    }
                    )
                }
                
            </Carousel>
        </div>
    );
}

export default AppHero;