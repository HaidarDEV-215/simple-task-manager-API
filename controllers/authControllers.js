const asyncWrapper = require('../middlewares/asyncWrapper.js');
const statusText = require('../utils/statusText.js');
const authServices = require('../services/authService.js');

const regester = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const token = await authServices.regesterService(firstName,lastName,email,password);
    res.status(201).json({ status: statusText.SUCCESS, msg: "User registered successfully", data: token });
});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const token = await authServices.loginService(email,password);
    res.status(200).json({ status: statusText.SUCCESS, msg: "User logged in successfully", data: token });
});

const forgetPassword = asyncWrapper(async (req, res, next) => {
    const email = req.body.email;
    await authServices.forgetPasswordService(email);
    res.status(200).json({ status: statusText.SUCCESS, msg: 'Verification email sent!' });
});

const confirmOTP = asyncWrapper(async (req, res, next) => {
    const { email, code } = req.body;
    const resetPasswordToken = await authServices.confirmOTPservice(email,code);
    res.status(200).json({ status: statusText.SUCCESS, message: "Email verified successfully", data: resetPasswordToken });
});

const resetPassword = asyncWrapper(async (req, res, next) => {
    const {newPassword} = req.body;
    const currentUser = req.currentUser;
    await authServices.resetPasswordService(newPassword, currentUser);
    res.status(200).json({ status: statusText.SUCCESS, message: "Password reset successfully" });
});

module.exports = { regester, login, forgetPassword, confirmOTP, resetPassword };