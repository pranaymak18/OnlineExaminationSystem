const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const forms = require('../../models/ExamModels')
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();
const nodemailer = require('nodemailer');
mainRouter.use(bodyParser.json());
const answersheet = require('../../models/AnswerSheetModels')
const result = require('../../models/Result')

require('dotenv/config');
var db = mongoose.connection;

var count = 0

mainRouter.route("/")
    .post((req, res) => {
        
        let body = req.body.users;
        let count = 0
        console.log("result "+body.length)
        
   
        try {          
           
            for(let i=0;i<body.length;i++) {
                console.log(body[i].examId)
                 result.countDocuments({$and: [{"examId":body[i].examId},{"students.studentEmail":  body[i].email }]}, (err, cnt) => { 
                    
                if(err)
                {
                    consol.log(err)
                }
                else{
                    if(cnt){
                        console.log("if cnt "+cnt)
                        count = count +cnt

                        var data = {"studentEmail":body[i].email,"subjectName":body[i].subjectName,"examDate":body[i].examDate,"marks":body[i].marks};
                        result.findOneAndUpdate(
                            {$and:[{ examId: body[i].examId},{"students":{$elemMatch: {studentEmail:body[i].email}}}]} , 
                            { $set: { "students.$.marks": body[i].marks } },
                        ).then((data) => {
                            console.log(body[i].email +" and data")
                           // res.status(200).json({"status" : "marks inserted !"});
                            //Answersheet created
                        
                        //  console.log(data);
                        }).catch((err) => {
                            console.log(err);
                        });
                        if(i===(body.length-1)){
                            res.setHeader('Content-Type', 'text/plain');
                            res.json({"status":`Marks of ${count} student/s have been updated`})
                        }

                    }
                else{
                var data = {"studentEmail":body[i].email,"subjectName":body[i].subjectName,"examDate":body[i].examDate,"marks":body[i].marks};
                result.findOneAndUpdate(
                    { examId: body[i].examId} , 
                    { $push: { students: data } },
                ).then((data) => {
                    console.log(body[i].email +" and data")
                    res.status(200).json({"status" : "marks inserted !"});
                    //Answersheet created
                   console.log("else "+count)
                  //  console.log(data);
                }).catch((err) => {
                    console.log(err);
                });
                }}})
            
            }

           
           
           
        } catch(err) {
            res.status(500);
        }
    });
module.exports = mainRouter;