const express = require('express');
const tasksController = require('../controllers/tasksControllers.js');
const {verifyToken} = require('../middlewares/validateToken.js');
const taskValidationHandler = require('../middlewares/tasksValidationHandler.js');
const taskValidationSchema = require('../functions/taskValidationSchema.js');
const router = express.Router();

router.route('/')
            .post(
                verifyToken,
                taskValidationSchema(),
                taskValidationHandler,
                tasksController.createTask
            ).get(
                verifyToken,
                tasksController.getAllTasks
            )

router.route('/:taskId')
            .get(
                verifyToken,
                tasksController.getOneTask
            ).patch(
                verifyToken,
                taskValidationSchema(),
                taskValidationHandler,
                tasksController.updateTask
            ).delete(
                verifyToken,
                tasksController.deleteTask
            )

module.exports = router;