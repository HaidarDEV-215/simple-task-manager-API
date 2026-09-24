const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers.js');
const {verifyResetPassWordToken} = require('../middlewares/validateToken.js');
const RequestsLimitter = require('../middlewares/rate-limit.js');
const {UserValidationSchema,resetPasswordValidationSchema} = require('../functions/userValidationSchema.js');
const userValidationHandler = require('../middlewares/userValidationHandler.js');

router.route('/register')
                .post(
                    RequestsLimitter.registerLimiter,
                    UserValidationSchema(),
                    userValidationHandler,
                    authController.register
                );

router.route('/login').post(RequestsLimitter.loginLimiter,authController.login);

router.route('/forgetPassword').post(RequestsLimitter.forgetPasswordLimiter,authController.forgetPassword);

router.route('/confirm').post(RequestsLimitter.confirmOTPLimiter,authController.confirmOTP);

router.route('/resetPassword')
                .post(
                    RequestsLimitter.resetPasswordLimiter,
                    resetPasswordValidationSchema(),
                    userValidationHandler,
                    verifyResetPassWordToken,
                    authController.resetPassword
                );

module.exports = router;