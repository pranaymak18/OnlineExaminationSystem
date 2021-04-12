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
    console.log(req.body.examId)
    //res.json({message : "deleted"})
    forms.updateMany({},{$pull: { exam: {examId: req.body.examId}}}, {multi : true})
    .then((data)=>{
       console.log("exams "+data.n)
       answersheet.deleteOne({examId:req.body.examId}).then((data)=>{console.log("answersheet "+data.n)})
    result.deleteOne({examId: req.body.examId}).then((data)=>{console.log("result "+data.n)})

    res.json({"message":"Exam deleted successfully! "})
    })
    
 })
 
 module.exports = mainRouter