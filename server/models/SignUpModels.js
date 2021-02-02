
const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
    },

    university: {
        type: String,
        required: true,
    },
    
    designation: {
        type: String,
        required: true,
    },

    id: {
        type: String,
        required: true,
    },
    
    idName: {
        type: String,
        required: true
    },

    photo: {
        type: String, 
        required: true
    },

    photoName: {
        type: String,
        required: true
    },
    
    status: {
        type: String, 
        default: "pending"
    },

  

})

module.exports = mongoose.model('admin',signUpTemplate)