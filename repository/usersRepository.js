const User = require("../models/userModel.js");

const getAllUsers = async (limit, skip) => {
    const users = await User.find({}, { '__v': false, 'password': false }).skip(skip).limit(limit);
    return users;
}

const getUserById = async (userId) => {
    const user = await User.findById(userId, { '__v': false, 'password': false });
    return user;
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email }, { '__v': false, 'password': false });
    return user;
}

const updateUserById = async (userId, data) => {
    const updatedUser = await User.findByIdAndUpdate(userId, data, { runValidators: true, returnDocument: 'after' });
    return updatedUser;
}

const deleteUserById = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
}

module.exports = { getAllUsers, getUserById, getUserByEmail, updateUserById, deleteUserById };