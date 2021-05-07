const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const user = require('../../models/UserModels');

const forms = require('../../models/ExamModels')
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();
const nodemailer = require('nodemailer');
const { response } = require('express');
mainRouter.use(bodyParser.json());
require('dotenv/config');

mainRouter.route("/")
.post((req, res) => {
    console.log(req.body.details)
   
    user.collection.find({$and:[{ "email": { $in: [req.body.details[0].email]}},{"role": { $ne:"super"}}]}).count()
                    .then((countUserExist) => {

                        console.log(countUserExist);
                        if (countUserExist === 1) {                        
                                    console.log("success");
                                    let transport = nodemailer.createTransport({
                                        service : 'gmail',
                                        auth : {
                                            user: process.env.gmail,
                                            pass: process.env.password,
                                        },
                                    });
                                
                                    
                                    let reply = {
                                        from: 'soes.contactme.prahar@gmail.com',
                                        to: req.body.details[0].email,
                                        subject: `OTP`,
                                        text: `This is your OTP: ${req.body.details[0].otp}`
                                    }
                                    
                                    
                                    transport.sendMail(reply, function(err,info) {
                                        if(err){
                                            console.log(err);
                                            res.send({ "message": "Network error!" })
                                        }
                                        else{        
                                                
                                                           //  console.log('email sent ' + info.response)
                                                             res.setHeader('Content-Type', 'text/plain');
                                                             res.json({ "message": "OTP has sent to the given email" });
                                                
                                            console.log('reply sent ' + info.response)                               
                                        }
                                    })
                                    
                              
                        } else {
                            res.status(200).json({ "message": "Organization with this email does not exists. Please signUp." })
                        }
                    }).catch((error)=>{
                        res.send({ "message": "Network error!" })
                    })
           
            


   
    
 })

 mainRouter.route("/changepassword")
.post((req, res) => {
    console.log(req.body.details)
    //$and:[ {email: req.body.details[0].email},{$not:{role:"super"}}]
    user.findOneAndUpdate({ email: req.body.details[0].email }, { $set: { password: req.body.details[0].password } }, {new:true},(error, doc) => {
        if (error) {
            res.statusCode = 501;
            res.send({ "message": "Failed to Update DB" })
        }
        else {
            console.log('data: ' + doc)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.json({ "message": "Password has been changed Successfully" });


        }
    })

    
})
 module.exports = mainRouter