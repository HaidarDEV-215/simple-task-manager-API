const User = require("../models/userModel.js");
const Otp = require("../models/OTPModel.js");
const asyncWrapper = require('../middlewares/asyncWrapper.js');
const AppError = require("../utils/appError.js");
const statusText = require('../utils/statusText.js');
const createToken = require('../functions/createJWT.js');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const emailService = require('../utils/emailService.js');
const verificationEmail = require('../utils/verificationEmailTemplate.js');

const regester = async ( firstName, lastName, email, password ) => {
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


module.exports = {regester}