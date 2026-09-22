const Otp = require("../models/OTPModel.js");

const createOTP = async (user, code) => {
    const otpData = {
        email: user.email,
        user: user._id,
        code: code,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    };
    const otp = new Otp(otpData);
    await otp.save();
    return otp;
}

const getOTPByUserEmail = async (email) => {
    // جلب الـ OTP شاملاً الـ code للتمكن من التحقق منه
    const otp = await Otp.findOne({ email }, { '__v': false });
    return otp;
}

const deleteOtpByUserEmail = async (email) => {
    const result = await Otp.deleteMany({ email });
    return result.deletedCount > 0;
}

const deleteOTPById = async (otpId) => {
    const deletedOTP = await Otp.findByIdAndDelete(otpId);
    return deletedOTP;
}

module.exports = {
    createOTP,
    getOTPByUserEmail,
    deleteOtpByUserEmail,
    deleteOTPById
};