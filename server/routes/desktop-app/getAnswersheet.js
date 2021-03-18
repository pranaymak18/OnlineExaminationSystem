const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const answersheet = require('../../models/AnswerSheetModels')
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();
const forms = require('../../models/ExamModels');

mainRouter.use(bodyParser.json());

var db = mongoose.connection;

mainRouter.route("/")
    .post((req, res) => {
  
        let eId = req.body.id;
        let pending 
        let countExamforms
        let countAnswersheet
        console.log("/ "+eId);

        forms.collection.find({ "exam.examId": eId}).count()
        .then((countUserExist) => {
            countExamforms = countUserExist - 1
            console.log("countExamforms "+countExamforms)

        })
        
        let query = answersheet.find({"examId" : eId});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else if(data.length){
                countAnswersheet = data[0].students.length
                pending = countExamforms - countAnswersheet
                console.log("countAnswersheet "+pending)
                console.log("student answersheet "+data[0].examId);
                res.status(200).json({answers : data, pending:pending});
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

   /* mainRouter.route("/countPending").post((req,res)=>{
        let countAnswersheet
        let countExamforms
        answersheet.find({examId:req.body.examId  }, (err, cnt) => {
            if(err){
                console.log(err)
            }
            else{
                countAnswersheet = cnt
            }
        })
        forms.countDocuments({$and:[{: request.body.email},{}]  }, (err, cnt) => {
            if(err){
                console.log(err)
            }
            else{
                countExamforms = cnt
            }
        })

    })*/
module.exports = mainRouter;