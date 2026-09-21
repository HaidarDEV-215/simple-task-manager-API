const mongoose = require('mongoose');
const validator = require('validator');

const OTPschema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,'filed must be a valid email address'],
    },
    code:{
        type:Number,
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    expiresAt:{
        type:Date,
        required:true,
        expires:0
    }
});


module.exports = mongoose.model('Otp',OTPschema);