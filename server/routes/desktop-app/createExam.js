const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const forms = require('../../models/ExamModels')
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();
const nodemailer = require('nodemailer');
mainRouter.use(bodyParser.json());

require('dotenv/config');
var db = mongoose.connection;

mainRouter.route("/")
    .post((req, res) => {
        
        let body = req.body.users;
        console.log(req.body.users.examId)
        
        try {
            for(let i=0;i<body.length;i++) {
                console.log(body[i].email)
                var data = {"examId":body[i].examId ,"formLink" : body[i].formLink, "subjectName" : body[i].subjectName, "examDate" : body[i].examDate, "examDuration" : body[i].examDuration, "examDescription" : body[i].examDescription,"pdf":body[i].pdf,"pdfName":body[i].pdfName};
                forms.findOneAndUpdate(
                    { email: body[i].email }, 
                    { $push: { exam: data } },
                ).then((data) => {
                    console.log(body[i].email +" and data")
                  //  console.log(data);
                }).catch((err) => {
                    console.log(err);
                });
            }
            res.status(200).json({"status" : "Exam created !"});
        } catch(err) {
            res.status(500);
        }
    });
module.exports = mainRouter;