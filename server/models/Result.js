const mongoose = require('mongoose')

const Schema = mongoose.Schema
let Result = new Schema({
    examId: {
        type: String,
        required: true
    },
    students: {
        type: Array
    }


}) 

module.exports = mongoose.model('result',Result)