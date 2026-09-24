const AppError = require("../utils/appError.js");
const statusText = require('../utils/statusText.js');
const createToken = require('../functions/createJWT.js');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const emailService = require('../utils/emailService.js');
const verificationEmail = require('../utils/verificationEmailTemplate.js');
const otpRepository = require('../repository/otpRepository.js');
const usersRepository = require('../repository/usersRepository.js');

const regesterService = async (firstName, lastName, email, password) => {
    const existUser = await usersRepository.getUserByEmail(email);
    if (existUser) {
        throw new AppError(`User with email ${email} already exists`, 400, statusText.FAIL);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await usersRepository.createUser(firstName, lastName, email, hashedPassword);
    const token = await createToken({ email: email, id: newUser._id, isAdmin: newUser.isAdmin || false });
    return token;
}

const loginService = async (email, password) => {
    if (!email || !password) {
        throw new AppError(`Email and password are required`, 400, statusText.FAIL);
    }
    const existUser = await usersRepository.getUserByEmailWithPassword(email);
    if (!existUser) {
        throw new AppError(`Invalid email or password`, 400, statusText.FAIL);
    }
    const matchedPassword = await bcrypt.compare(password, existUser.password);
    if (!matchedPassword) {
        throw new AppError(`Invalid email or password`, 400, statusText.FAIL);
    }
    const token = await createToken({ email: email, id: existUser._id, isAdmin: existUser.isAdmin || false });
    return token;
}

const forgetPasswordService = async (email) => {
    if (!email) {
        throw new AppError(`Email is required`, 400, statusText.FAIL);
    }
    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
        throw new AppError(`User with this email does not exist!`, 404, statusText.FAIL);
    }
    await otpRepository.deleteOtpByUserEmail(email);
    const OneTimePassword = crypto.randomInt(100000, 999999);
    await otpRepository.createOTP(user, OneTimePassword);
    await emailService(email, 'Verify your account', verificationEmail(OneTimePassword));
    return true;
}

const confirmOTPservice = async (email, code) => {
    if (!email || !code) {
        throw new AppError("Email and code are required!", 400, statusText.FAIL);
    }
    const otp = await otpRepository.getOTPByUserEmail(email);
        if (!otp || String(otp.code) !== String(code)) {
        throw new AppError('Invalid OTP!', 400, statusText.FAIL);
    }
    if (otp.expiresAt < Date.now()) {
        await otpRepository.deleteOTPById(otp._id); 
        throw new AppError('OTP has expired!', 400, statusText.FAIL);
    }
    await otpRepository.deleteOTPById(otp._id);
    const resetPasswordToken = await createToken({ id: otp.user, email: otp.email, purpose: "reset-password" }, "5m");
    return resetPasswordToken;
}

const resetPasswordService = async (newPassword, currentUser) => {
    if(currentUser.purpose!=="reset-password"){
        throw new AppError("invalid reset token", 403, statusText.FAIL);
    }
    if (!newPassword) {
        throw new AppError("Password is required!", 400, statusText.FAIL);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await usersRepository.updateUserPassword(currentUser.email, hashedPassword);
    return user;
}

module.exports = {
    regesterService,
    loginService,
    forgetPasswordService,
    confirmOTPservice,
    resetPasswordService
};