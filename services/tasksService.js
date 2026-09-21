const Task = require('../models/taskModel.js');
const AppError = require("../utils/appError.js");
const statusText = require('../utils/statusText.js');

const create = async (title, desc) => {
    const task = new Task({ title, desc });
    await task.save();
    return task;
}

const getAllTasks = async (limit, page) => {
    const skip = (page - 1) * limit;
    const tasks = await Task.find({}, { "__v": false }).limit(limit).skip(skip);
    return tasks;
}

const getTaskById = async (taskId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new AppError("task not found", 404, statusText.FAIL);
    }
    return task;
}

const updateTaskById = async (taskId, data) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new AppError("task not found", 404, statusText.FAIL);
    }
    const data = req.body;
    data.updatedAt = Date.now();
    const updatedTask = await Task.findByIdAndUpdate(taskId, data, { returnDocument: "after", runValidators: true });
    return updatedTask;
}

const deleteTaskById = async (taskId) => {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
        throw new AppError("task not found", 404, statusText.FAIL);
    }
    return true;
}

module.exports = { create, getAllTasks, getTaskById, updateTaskById, deleteTaskById }