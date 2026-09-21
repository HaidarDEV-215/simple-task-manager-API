const User = require("../models/userModel.js");
const AppError = require("../utils/appError.js");
const statusText = require('../utils/statusText.js');

const getAllUsers = async (limit, page) => {
    const skip = (page - 1) * limit;
    const users = await User.find({}, { "__v": false }).limit(limit).skip(skip);
    if (!users) {
        throw new AppError('no uesrs found', 404, statusText.FAIL);
    }
    return users;
}

const getUserById = async (userId) => {
    const user = await User.findById(userId, { "__v": false, "password": false });
    if (!user) {
        throw new AppError("no users found", 404, statusText.FAIL);
    }
    return user;
}

const deleteUserById = async (userId) => {
    const userToDelete = await User.findByIdAndDelete(userId);
    if (!userToDelete) {
        throw new AppError("no users found", 404, statusText.FAIL);
    }
    return true;
}

const updateUserById = async (userId, data) => {
    const invalidUpdates = ['password', '_id'];
    for (let key in invalidUpdates) {
        if (updateSchema[key]) {
            delete updateSchema[key];
        }
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateSchema, { returnDocument: 'after', runValidators: true }).select("-password");
    if (!updatedUser) {
        throw new AppError("no users found", 404, statusText.FAIL);
    }
    return updatedUser;
}

module.exports = { getAllUsers, getUserById, deleteUserById, updateUserById }