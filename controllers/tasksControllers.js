const asyncWrapper = require('../middlewares/asyncWrapper.js');
const taskServices = require('../services/tasksService.js');

const createTask = asyncWrapper(async (req, res, next) => {
    const { title, desc } = req.body;
    const newTask = await taskServices.create(title, desc);
    res.status(201).json({ msg: "task created successfully", data: newTask })
})

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const tasks = await taskServices.getAllTasks(limit, page);
    res.status(200).json({ items: tasks.length, data: tasks });
})

const getOneTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.taskId;
    const task = taskServices.getTaskById(taskId);
    res.status(200).json({ data: task });
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.taskId;
    const data = req.body;
    const updatedTask = await taskServices.updateTaskById(taskId, data);
    res.status(200).json({ msg: "task updated successfully", data: updatedTask });
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.taskId;
    await taskServices.deleteTaskById(taskId);
    res.status(200).json({ msg: "task deleted successfully", data: null });
})

module.exports = { createTask, getAllTasks, getOneTask, updateTask, deleteTask }