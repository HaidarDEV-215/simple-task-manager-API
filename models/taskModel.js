const mongoose = require("mongoose");

const taskModel = mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    desc:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    isDone:{
        type:Boolean,
        default:false
    },
    updatedAt:{
        type:Date,
        default:null
    }
})

module.exports = mongoose.model('Task',taskModel);