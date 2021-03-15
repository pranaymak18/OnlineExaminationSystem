const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const answersheet = require('../../models/AnswerSheetModels')
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();

mainRouter.use(bodyParser.json());

var db = mongoose.connection;

mainRouter.route("/")
    .post((req, res) => {
  
        let eId = req.body.id;
       
        console.log("/ "+eId);
        let query = answersheet.find({"examId" : eId});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else if(data.length){
                console.log("student answersheet "+data[0].examId);
                res.status(200).json({answers : data});
            }
            else{
                console.log("data length "+data.length)
            }
        })
    
    });

    mainRouter.route("/download")
    .post((req, res) => {
        let eId = req.body.id;
        console.log("/download "+eId);
        let query = answersheet.find({"students.studentEmail": eId},{_id: 0, students:{$elemMatch: {studentEmail : eId}}});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {
                pdf = data[0].students[0].pdf
                console.log("student answersheet "+data[0].students[0].pdfName);
                res.status(200).json({"statusMessage" : "Downloading..."});
                res.download(pdf)
            }
        })
    });
module.exports = mainRouter;