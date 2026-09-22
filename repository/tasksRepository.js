const Task = require('../models/taskModel.js');

const createTask = async (title, desc) => {
    const task = new Task({ title, desc });
    await task.save();
    return task;
}

const getAllTasks = async (limit, skip) => {
    const tasks = await Task.find({}, { '__v': false }).limit(limit).skip(skip);
    return tasks;
}

const getTaskById = async (taskId) => {
    const task = await Task.findById(taskId, { '__v': false });
    return task;
}

const upateTaskById = async (taskId, data) => {
    const taskToUpdate = await Task.findByIdAndUpdate(taskId, data, { runValidators: true, returnDocument: 'after' });
    return taskToUpdate;
}

const deleteTaskById = async (taskId) => {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return deletedTask;
}

module.exports = { getAllTasks, getTaskById, upateTaskById, deleteTaskById, createTask }