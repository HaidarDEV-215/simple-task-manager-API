const express = require('express');
const userController = require('../controllers/userControlles');
const verifyAction = require('../middlewares/validateToken.js');
const {updateUserValidationSchema} = require('../functions/userValidationSchema.js');
const userValidationHandler = require('../middlewares/userValidationHandler.js');


const router = express.Router();

router.route('/')
        .get(
            userController.getAllUsers
        )

router.route('/:userId')
        .patch(
            verifyAction.verifyToken,
            verifyAction.verifyUserHimSelf,
            updateUserValidationSchema(),
            userValidationHandler,
            userController.updateUser
        ).delete(
            verifyAction.verifyToken,
            verifyAction.verifyUserHimSelf,
            userController.deleteUser
        )


module.exports = router;