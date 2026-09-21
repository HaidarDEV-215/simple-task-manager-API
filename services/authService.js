const User = require("../models/userModel.js");
const Otp = require("../models/OTPModel.js");
const AppError = require("../utils/appError.js");
const statusText = require('../utils/statusText.js');
const createToken = require('../functions/createJWT.js');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const emailService = require('../utils/emailService.js');
const verificationEmail = require('../utils/verificationEmailTemplate.js');

const regesterService = async (firstName, lastName, email, password) => {
    const existUser = await User.findOne(email);
    if (existUser) {
        throw new AppError(`User with email ${email} already exists`, 400, statusText.FAIL);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
        firstName,
        lastName,
        email,
        password: hashedPassword
    };

    const newUser = new User(newUserData);
    await newUser.save();

    const token = await createToken({ email: email, id: newUser._id, isAdmin: newUser.isAdmin });
    return token;
}

const loginService = async (email, password) => {
    if (!email || !password) {
        throw new AppError(`Email and password are required`, 400, statusText.FAIL);
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
        throw new AppError(`Invalid email or password`, 400, statusText.FAIL);
    }

    const matchedPassword = await bcrypt.compare(password, existUser.password);
    if (!matchedPassword) {
        throw new AppError(`Invalid email or password`, 400, statusText.FAIL);
    }

    const token = await createToken({ email: email, id: existUser._id, isAdmin: existUser.isAdmin });

    return token;
}

const forgetPasswordService = async (email) => {
    if (!email) {
        throw new AppError(`Email is required`, 400, statusText.FAIL);
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(`User with this email does not exist!`, 404, statusText.FAIL);
    }

    await Otp.deleteMany({ email });

    const OneTimePassword = crypto.randomInt(100000, 999999);

    const otpData = {
        email: email,
        user: user._id,
        code: OneTimePassword,
        expiresAt: Date.now() + (1000 * 60 * 5) // 5 mins
    };

    const otp = new Otp(otpData);
    await otp.save();

    await emailService(email, 'Verify your account', verificationEmail(OneTimePassword));

    return true;
}

const confirmOTPservice = async (email, code) => {
    if (!email || !code) {
        throw new AppError("Email and code are required!", 400, statusText.FAIL);
    }

    const otp = await Otp.findOne({ email: email, code: code });
    if (!otp) {
        throw new AppError('Invalid OTP!', 400, statusText.FAIL);
    }

    if (otp.expiresAt < Date.now()) {
        await Otp.deleteOne({ _id: otp._id });
        throw new AppError('OTP has expired!', 400, statusText.FAIL);
    }

    //delete otp when its done
    await Otp.deleteOne({ _id: otp._id });

    const resetPasswordToken = await createToken({ id: otp.user, email: otp.email, purpose: "reset-password" }, "5m");
    
    return resetPasswordToken;
}

const resetPasswordService = async (newPassword, email) => {
    if (!newPassword) {
        throw new AppError("Password is required!", 400, statusText.FAIL);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedPassword);
    await User.findOneAndUpdate({ email }, { password: hashedPassword }, { runValidators: true });

    return true;
}

module.exports = {
    regesterService,
    loginService,
    forgetPasswordService,
    confirmOTPservice,
    resetPasswordService
};