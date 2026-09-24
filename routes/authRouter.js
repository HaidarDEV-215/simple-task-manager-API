const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers.js');
const {verifyResetPassWordToken} = require('../middlewares/validateToken.js');
const {authRequestsLimitter} = require('../middlewares/rate-limit.js');

router.route('/regester').post(authRequestsLimitter,authController.regester);

router.route('/login').post(authRequestsLimitter,authController.login);

router.route('/forgetPassword').post(authRequestsLimitter,authController.forgetPassword);

router.route('/confirm').post(authRequestsLimitter,authController.confirmOTP);

router.route('/resetPassword').post(authRequestsLimitter,verifyResetPassWordToken,authController.resetPassword);

module.exports = router;