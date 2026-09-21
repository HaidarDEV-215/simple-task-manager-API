const Task = require('../models/taskModel.js');
const asyncWrapper = require('../middlewares/asyncWrapper.js');
const AppError = require("../utils/appError.js");
const statusText = require('../utils/statusText.js');

const createTask = asyncWrapper(async (req,res,next)=>{
    const newTask = new Task(req.body);
    await newTask.save()
    res.status(201).json({msg:"task created successfully",data:newTask})
})


/**
 * @desc get All tasks
 * @route /api/tasks
 * @method GET
 * @access public
 */

const getAllTasks = asyncWrapper(async (req,res,next)=>{
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page-1)*limit;
    const tasks = await Task.find({},{"__v":false}).limit(limit).skip(skip);
    res.status(200).json({items:tasks.length,data:tasks});
})

const getOneTask = asyncWrapper( async (req,res,next)=>{
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if(!task){
        throw new AppError("task not found",404,statusText.FAIL);
    }

    res.status(200).json({data:task});
})

const updateTask = asyncWrapper( async (req,res,next)=>{
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if(!task){
        throw new AppError("task not found",404,statusText.FAIL);
    }
    const data = req.body;
    data.updatedAt=Date.now();
    const updatedTask = await Task.findByIdAndUpdate(taskId,data,{returnDocument:"after",runValidators:true});

    res.status(200).json({msg:"task updated successfully",data:updatedTask});
})

const deleteTask = asyncWrapper( async (req,res,next)=>{
    const taskId = req.params.taskId;
    const task = await Task.findByIdAndDelete(taskId);
    if(!task){
        throw new AppError("task not found",404,statusText.FAIL);
    }
    res.status(200).json({msg:"task deleted successfully",data:null});
})

module.exports = {createTask, getAllTasks, getOneTask, updateTask, deleteTask}