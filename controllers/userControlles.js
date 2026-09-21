const User = require("../models/userModel.js");
const asyncWrapper = require('../middlewares/asyncWrapper.js');
const AppError = require("../utils/appError.js");
const statusText = require('../utils/statusText.js');
const createToken = require('../functions/createJWT.js');
const bcrypt = require('bcryptjs')


const getAllUsers = asyncWrapper( async (req,res,next)=>{
    const limit = req.query.limit;
    const page = req.query.page;
    const skip = (page-1)*limit;
    const users = await User.find({},{"__v":false}).limit(limit).skip(skip);
    if(!users){
        throw new AppError('no uesrs found',404,statusText.FAIL);
    }
    res.status(200).json({items:users.length,data:users});
});

const getOneUser = asyncWrapper(async (req,res,next)=>{
    const userId = req.params.userId;
    const user = await User.findById(userId,{"__v":false,"password":false});
    if(!user){
        throw new AppError("no users found",404,statusText.FAIL);
    }
    res.status(200).json({data:user});
});

const deleteUser = asyncWrapper(async (req,res,next)=>{
    const userId = req.params.userId;
    const userToDelete = await User.findByIdAndDelete(userId);
    if(!userToDelete){
        throw new AppError("no users found",404,statusText.FAIL);
    }
    res.status(200).json({message:"user deleted successfully"});
});

const updateUser = asyncWrapper(async (req,res,next)=>{
    const userId = req.params.userId;
    const updateSchema = req.body;
    const invalidUpdates = ['password','_id'];
    for(let key in invalidUpdates){
        if(updateSchema[key]){
            delete updateSchema[key];
        }
    }
    const updatedUser = await User.findByIdAndUpdate(userId,updateSchema,{returnDocument:'after',runValidators:true}).select("-password");
    if(!updatedUser){
        throw new AppError("no users found",404,statusText.FAIL);
    }
    res.status(200).json({message:"user updated successfully",data:updatedUser});
});

module.exports = {getAllUsers,getOneUser,deleteUser,updateUser}