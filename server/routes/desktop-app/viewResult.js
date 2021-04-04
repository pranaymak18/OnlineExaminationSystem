const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const forms = require('../../models/ExamModels');
const path = require('path');
const generator = require('generate-password');
const result = require('../../models/Result')

const mainRouter = express.Router();

mainRouter.use(bodyParser.json());

var db = mongoose.connection;

mainRouter.route("/")
    .post((req, res) => {
        let user = req.body.examId;
        console.log("view result "+req.body.student.email);


        
        let query = result.find({"examId" : req.body.student.examId});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {

                
                console.log("student marks "+data);
                res.status(200).json({result : data});
             
            }
        })
    
  //  res.json({results:showresult})

    

    });
module.exports = mainRouter;