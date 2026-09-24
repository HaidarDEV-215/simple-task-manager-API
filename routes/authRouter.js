const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers.js');
const {verifyResetPassWordToken} = require('../middlewares/validateToken.js');
const {authRequestsLimitter} = require('../middlewares/rate-limit.js');
const {UserValidationSchema,updateUserValidationSchema} = require('../functions/userValidationSchema.js');
const userValidationHandler = require('../middlewares/userValidationHandler.js');

router.route('/register')
                .post(
                    authRequestsLimitter,
                    UserValidationSchema(),
                    userValidationHandler,
                    authController.register
                );

router.route('/login').post(authRequestsLimitter,authController.login);

router.route('/forgetPassword').post(authRequestsLimitter,authController.forgetPassword);

router.route('/confirm').post(authRequestsLimitter,authController.confirmOTP);

router.route('/resetPassword')
                .post(
                    authRequestsLimitter,
                    updateUserValidationSchema(),
                    userValidationHandler,
                    verifyResetPassWordToken,
                    authController.resetPassword
                );

module.exports = router;