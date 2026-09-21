const statusText = require('../utils/statusText.js');
const AppError = require("../utils/appError.js");

const notFoundError = (req,res,next)=>{
    // res.status(404).json({msg:"page not found!",statusText:statusText.FAIL,data:null});
    const error = new AppError("page not found!",404,statusText.FAIL);
    next(error);
}


const ErrorHandler = (error,req,res,next)=>{
    res.status(error.statusCode || 500).json({msg:error.message || "enternal server error",statusText:error.statusText || statusText.ERROR,data:null})
}


module.exports = {notFoundError,ErrorHandler}