const express = require('express');
const userController = require('../controllers/userControlles');
const verifyAction = require('../middlewares/validateToken.js');

const router = express.Router();

router.route('/')
        .get(
            userController.getAllUsers
        )

router.route('/:userId')
        .patch(
            verifyAction.verifyToken,
            verifyAction.verifyUserHimSelf,
            userController.updateUser
        ).delete(
            verifyAction.verifyToken,
            verifyAction.verifyUserHimSelf,
            userController.deleteUser
        )


module.exports = router;