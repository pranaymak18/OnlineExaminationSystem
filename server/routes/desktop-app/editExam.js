const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const forms = require('../../models/ExamModels')
const answersheet = require('../../models/AnswerSheetModels')
const result = require('../../models/Result')
require('dotenv/config');
const mainRouter = express.Router()
mainRouter.use(bodyParser.json());

mainRouter.route("/")
.post((req, res) => {
    console.log(req.body.exam.subjectName)
    forms.updateMany({"exam.examId": req.body.exam.examId },{$set: {"exam.$": req.body.exam}}).then((data)=>{
        console.log(data)
        res.send({"message":"done"})
    })
    
   
    
 })
 
 module.exports = mainRouter