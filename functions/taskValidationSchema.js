const{body} = require('express-validator');

const taskValidationSchema = ()=>{
    return([
        body('title').isLength({min:5,max:25}).withMessage("task title must be between 5 and 25")
    ]);
}

module.exports = taskValidationSchema;