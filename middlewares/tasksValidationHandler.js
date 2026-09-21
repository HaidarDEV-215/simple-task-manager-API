const {validationResult}= require('express-validator')
const statusText = require('../utils/statusText')
const AppError = require("../utils/appError");


module.exports = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new AppError(errors.array(),400,statusText.FAIL);
        return next(error);
    }
    next();
}