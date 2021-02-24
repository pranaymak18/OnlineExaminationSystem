const mongoose = require('mongoose')

const Schema = mongoose.Schema
let ExamForm = new Schema({
    email: {
        type: String,
        required: true
    },
    exam: {
        type: Array
    }


}) 

module.exports = mongoose.model('examform',ExamForm)