const userModel = require('../models/userModel.js');
const AppError = require('../utils/appError.js');
const statusText = require('../utils/statusText.js');
const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader){
        const error = new AppError("Unauthorize! Token is required",401,statusText.FAIL);
        return next(error);
    }
    const token = authHeader.split(" ")[1];
    try{
        const decodedToken = jwt.verify(token,process.env.SECRET_KEY)
        req.currentUser = decodedToken; //request manipulation 
        next();
    }catch(err){
        const error = new AppError("Unauthorize! invalid Token",401,statusText.FAIL);
        return next(error);
    }
}

const verifyUserHimSelf = (req,res,next)=>{
    try{
        if (!req.currentUser) {
            throw new AppError("no user id", 400, statusText.FAIL);
        }
        if(req.currentUser.id!==req.params.userId){
            throw new AppError("Unauthorized! owner access only.", 401, statusText.FAIL);
        }
        next();
    }catch(err){
        const error = new AppError(err.message,err.statusCode,err.statusText);
        return next(error);
    }

}


module.exports = {verifyToken,verifyUserHimSelf}