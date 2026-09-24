const{body} = require('express-validator');

const taskValidationSchema = ()=>{
    return([
        body('title').optional().isLength({min:5,max:25}).withMessage("task title must be between 5 and 25"),
        body('desc').optional().isLength({min:5,max:200}).withMessage('task description must be between 5 and 200')
    ]);
}

module.exports = taskValidationSchema;