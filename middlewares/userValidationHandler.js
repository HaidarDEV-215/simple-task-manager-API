const {validationResult} = require('express-validator');
const AppError = require('../utils/appError.js');
const statusText = require('../utils/statusText.js');

const userValidationHandler = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new AppError(errors.array(),400,statusText.FAIL);
        return next(error);
    }
    next();
}

module.exports = userValidationHandler;