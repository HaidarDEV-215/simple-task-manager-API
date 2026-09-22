const tasksRepository = require('../repository/tasksRepository.js');
const AppError = require("../utils/appError.js");
const statusText = require('../utils/statusText.js');

const create = async (title, desc) => {
    const task = await tasksRepository.createTask(title, desc);
    return task;
}

const getAllTasks = async (limit, page) => {
    const skip = (page - 1) * limit;
    const tasks = await tasksRepository.getAllTasks(limit, skip);
    return tasks;
}

const getTaskById = async (taskId) => {
    const task = await tasksRepository.getTaskById(taskId);
    if (!task) {
        throw new AppError("task not found", 404, statusText.FAIL);
    }
    return task;
}

const updateTaskById = async (taskId, data) => {
    const updatedTask = await tasksRepository.upateTaskById(taskId, data);
    if (!updatedTask) {
        throw new AppError("task not found", 404, statusText.FAIL);
    }
    return updatedTask;
}

const deleteTaskById = async (taskId) => {
    const task = await tasksRepository.deleteTaskById(taskId);
    if (!task) {
        throw new AppError("task not found", 404, statusText.FAIL);
    }
    return true;
}

module.exports = { create, getAllTasks, getTaskById, updateTaskById, deleteTaskById }