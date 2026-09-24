const AppError = require("../utils/appError.js");
const statusText = require('../utils/statusText.js');
const usersRepository = require('../repository/usersRepository.js');

const getAllUsers = async (limit, page) => {
    const skip = (page - 1) * limit;
    const users = await usersRepository.getAllUsers(limit, skip);
    if (!users) {
        throw new AppError('no uesrs found', 404, statusText.FAIL);
    }
    return users;
}

const getUserById = async (userId) => {
    const user = await usersRepository.getUserById(userId);
    if (!user) {
        throw new AppError("no users found", 404, statusText.FAIL);
    }
    return user;
}

const deleteUserById = async (userId) => {
    const userToDelete = await usersRepository.deleteUserById(userId);
    if (!userToDelete) {
        throw new AppError("no users found", 404, statusText.FAIL);
    }
    return true;
}

const updateUserById = async (userId, data) => {
    const validUpdates = ['firstName', 'lastName'];
    const saveData = {};
    for (const filed of validUpdates){
        if(data[filed]==!undefined){
            saveData[filed] = data[filed]
        }
    }
    const updatedUser = await usersRepository.updateUserById(userId, saveData);
    if (!updatedUser) {
        throw new AppError("no users found", 404, statusText.FAIL);
    }
    return updatedUser;
}

module.exports = { getAllUsers, getUserById, deleteUserById, updateUserById }