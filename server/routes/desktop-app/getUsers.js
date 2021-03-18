const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const user = require('../../models/UserModels');
const path = require('path');
const generator = require('generate-password');
const mainRouter = express.Router();

mainRouter.use(bodyParser.json());



mainRouter.route("/faculties")
    .post((req, res) => {
        let query = user.find( {  $and: [{ orgId: { $eq: req.body.orgId } }, {  "role" : "faculty" } ] })
        // let query = user.find({"role" : "faculty"});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {
                res.status(200).json({users : data});
            }
        })
    });
mainRouter.route("/students")
.post((req, res) => {
    let query = user.find( {  $and: [{ orgId: { $eq: req.body.orgId } }, {  "role" : "student" } ] })
    // let query = user.find({"role" : "student"});
    query.exec((err,data) => {
        if(err) {
            res.status(500);
        } else {
            res.status(200).json({users : data});
        }
    })
});
mainRouter.route("/admins")
    .post((req, res) => {
        console.log("/admins "+ req.body.orgId)
        let query = user.find( {  $and: [{ orgId: { $eq: req.body.orgId } },{  "role" : "admin" }] })
      // let query = user.find({"role" : "admin"});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {
                console.log(data)
                res.status(200).json({users : data});
            }
        })
    });

module.exports = mainRouter;