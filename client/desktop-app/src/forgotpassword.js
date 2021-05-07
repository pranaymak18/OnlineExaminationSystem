import { Component, Fragment,useState,useEffect } from 'react';
import uuid from 'react-uuid'
import { Breadcrumb, BreadcrumbItem, Jumbotron, Table, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
const axios = require('axios');
const path = require('path');
const electron = window.require('electron');
const Notification = electron.remote.Notification; 


export default function Forgotpassword(props){
const [email,setEmail] = useState("")
const [otp,setOtp] = useState("")
const [state,setState] = useState("")
const [password,setPassword] = useState("")
const [cfmpassword,setCfmpassword] = useState("")
const [errorMessage,setErrorMessage] = useState("")
const [showSpinner,setShowSpinner] = useState(false)
const [seconds, setSeconds] = useState(0);

useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      
    }
  });

const genOtp = ()=> {
  //  alert(email)
  
    setShowSpinner(true)
    if (/^([\w\d](\.)*)+\@([\w\.]{1,2})+(\w)$/.test(email)){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    setOtp(text) ;
    let mail = [];
    mail.push({
        email: email,
        otp: text
    })
    axios.post('http://localhost:5000/forgotpassword',{details: mail})
    .then((response)=>{
        
        if(response.data.message === "Organization with this email does not exists. Please signUp.")
        {
            setState("email")
           // alert(response.data.message)
           setShowSpinner(false)
           const options = { 
            title: 'Message', 
            subtitle: 'Total', 
            body: `${response.data.message}`, 
            silent: false, 
            icon: path.join(__dirname, '../assets/image.png'), 
            hasReply: true,   
            timeoutType: 'never',  
            replyPlaceholder: 'Reply Here', 
            sound: path.join(__dirname, '../assets/sound.mp3'), 
            urgency: 'critical' ,
            closeButtonText: 'Close Button',
            actions: [ { 
                type: 'button',  
                text: 'Show Button'
            }] 
        } 
        const customNotification = new Notification(options)
        customNotification.show()
        }
        else if(response.data.message === "OTP has sent to the given email"){
          //  alert(response.data.message)
          setSeconds(30)
            setShowSpinner(false)
            const options = { 
                title: 'Message', 
                subtitle: 'Total', 
                body: `${response.data.message}`, 
                silent: false, 
                icon: path.join(__dirname, '../assets/image.png'), 
                hasReply: true,   
                timeoutType: 'never',  
                replyPlaceholder: 'Reply Here', 
                sound: path.join(__dirname, '../assets/sound.mp3'), 
                urgency: 'critical' ,
                closeButtonText: 'Close Button',
                actions: [ { 
                    type: 'button',  
                    text: 'Show Button'
                }] 
            } 
            const customNotification = new Notification(options)
            customNotification.show()
            setState(
                "otp"
             )
             

        }
    })
    
     Array.from(document.querySelectorAll("Input")).forEach(
        input => (input.value = '')
)
     }
     else {
       // alert("Enter Proper Mail ID");
       const options = { 
        title: 'Message', 
        subtitle: 'Total', 
        body: `Enter Proper Mail ID`, 
        silent: false, 
        icon: path.join(__dirname, '../assets/image.png'), 
        hasReply: true,   
        timeoutType: 'never',  
        replyPlaceholder: 'Reply Here', 
        sound: path.join(__dirname, '../assets/sound.mp3'), 
        urgency: 'critical' ,
        closeButtonText: 'Close Button',
        actions: [ { 
            type: 'button',  
            text: 'Show Button'
        }] 
    } 
    const customNotification = new Notification(options)
    customNotification.show()
        setShowSpinner(false)

    }
  }
const otpchk=()=>{
    
    if(otp === document.getElementById('otp').value)
    {
        setState("password")
        Array.from(document.querySelectorAll("Input")).forEach(
            input => (input.value = '')
    )
    }
    else{
       // alert("false")
        //setState("email")

        Array.from(document.querySelectorAll("Input")).forEach(
            input => (input.value = '')
    )
    }
}

const confirm = ()=>{
   if(password !== "" && cfmpassword !=="" && cfmpassword===password)
   {
      
    let changepass = []
    changepass.push({
        email: email,
        password: password
    })
    axios.post('http://localhost:5000/forgotpassword/changepassword',{details: changepass})
    .then((response)=>{
       // alert(response.data.message)
       const options = { 
        title: 'Message', 
        subtitle: 'Total', 
        body: `${response.data.message}`, 
        silent: false, 
        icon: path.join(__dirname, '../assets/image.png'), 
        hasReply: true,   
        timeoutType: 'never',  
        replyPlaceholder: 'Reply Here', 
        sound: path.join(__dirname, '../assets/sound.mp3'), 
        urgency: 'critical' ,
        closeButtonText: 'Close Button',
        actions: [ { 
            type: 'button',  
            text: 'Show Button'
        }] 
    } 
    const customNotification = new Notification(options)
    customNotification.show()
        window.location.replace('/')
    })
   }
   else
   {
    const options = { 
        title: 'Message', 
        subtitle: 'Total', 
        body: `Passwords should be match but not empty`, 
        silent: false, 
        icon: path.join(__dirname, '../assets/image.png'), 
        hasReply: true,   
        timeoutType: 'never',  
        replyPlaceholder: 'Reply Here', 
        sound: path.join(__dirname, '../assets/sound.mp3'), 
        urgency: 'critical' ,
        closeButtonText: 'Close Button',
        actions: [ { 
            type: 'button',  
            text: 'Show Button'
        }] 
    } 
    const customNotification = new Notification(options)
    customNotification.show()
   }
   
}
    
const handlechange = (event)=>{
    if(event.target.name==="email")
    {
        setEmail(event.target.value)
    }
    if(event.target.name==="password")
    {
        setPassword(event.target.value)
        if(event.target.value.length < 6){
            setErrorMessage("password length must be greater than 6")
        }
        else{
            setErrorMessage("")
            if(event.target.value  === cfmpassword ){
                setErrorMessage("")
               // setCfmpassword("confirm")
            }
            else{
                setErrorMessage("Password don't match")
            }
        }
    }
    if(event.target.name==="cfmpassword")
    {
        setCfmpassword(event.target.value)
        if(event.target.value  ===password ){
            setErrorMessage("")
           // setCfmpassword("confirm")
        }
        else{
            setErrorMessage("Password don't match")
        }

    }
   // alert(email)
}

if(state === "password")
{
    return(
        <>
         <Form className="login-form" >
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" placeholder="Password" name="password" id="password" onChange={handlechange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input type="text" placeholder="Confirm Password" name="cfmpassword" id="cfmpassword" onChange={handlechange}/>
                    {errorMessage && <div className="error"> {errorMessage} </div>}
                </FormGroup>
                <FormGroup>
                    <Button className="btn-lg btn-dark btn-block" onClick={confirm}>Confirm</Button>
                </FormGroup>
            </Form>
              
        </>
    )
}
else if(state === "otp")
{
   // alert(email)
   if(seconds === 0)
     setSeconds(<Button style={{marginLeft: '4px'}} color="primary" onClick={genOtp}>Resend OTP</Button>);
    return(
        <>
                    <Form className="login-form" >
                    <FormGroup>
                        <Label>Otp</Label>
                        <Input type="otp" placeholder="OTP" id="otp" />

                    </FormGroup>

                    <FormGroup>

                        <Button onClick={otpchk}>Go</Button> 
                        &nbsp;&nbsp;{seconds}
                    </FormGroup>
                </Form>
                    
                    </>
    );

}
return(
    <>
                <Form className="login-form" >
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Email" name="email" id="email" onChange={handlechange}/>
                </FormGroup>
               
                <FormGroup>
                <Button color="warning" href="/">Go to Login page</Button>
                    <Button style={{marginLeft: '4px'}} color="primary" onClick={genOtp}>Confirm</Button>
                
                   
                    <center>
                            <ClipLoader
                                size={50}
                                color={"#123abc"}
                                loading={showSpinner}
                            />
                        </center>
                </FormGroup>
            </Form>
                
                </>
);
}