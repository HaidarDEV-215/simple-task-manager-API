const asyncWrapper = require('../middlewares/asyncWrapper.js');
const usersServices = require('../services/usersServices.js');

const getAllUsers = asyncWrapper(async (req, res, next) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const users = await usersServices.getAllUsers(limit, page);
    res.status(200).json({ items: users.length, data: users });
});

const getOneUser = asyncWrapper(async (req, res, next) => {
    const userId = req.params.userId;
    const user = await usersServices.getUserById(userId);
    res.status(200).json({ data: user });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
    const userId = req.params.userId;
    await usersServices.deleteUserById(userId);
    res.status(200).json({ message: "user deleted successfully" });
});

const updateUser = asyncWrapper(async (req, res, next) => {
    const userId = req.params.userId;
    const updateSchema = req.body;
    const updatedUser = await usersServices.updateUserById(userId, updateSchema);
    res.status(200).json({ message: "user updated successfully", data: updatedUser });
});

module.exports = { getAllUsers, getOneUser, deleteUser, updateUser }