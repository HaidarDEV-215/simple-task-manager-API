const express = require('express');
const router = express();
const authController = require('../controllers/authControllers.js');
const {verifyToken} = require('../middlewares/validateToken.js')

router.route('/regester').post(authController.regester);

router.route('/login').post(authController.login);

router.route('/forgetPassword').post(authController.forgetPassword);

router.route('/confirm').post(authController.confirmOTP);

router.route('/resetPassword').post(verifyToken,authController.resetPassword);

module.exports = router;