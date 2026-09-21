const mongoose = require("mongoose");

const taskModel = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    desc: {
        type: String,
        required: false
    },
    isDone: {
        type: Boolean,
        default: false
    }
}, { timeStamp: true })

module.exports = mongoose.model('Task', taskModel);