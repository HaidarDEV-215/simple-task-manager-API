const User = require("../models/userModel.js");

const createUser = async (firstName, lastName, email, hashedPassword) => {
    const newUserData = {
        firstName,
        lastName,
        email,
        password: hashedPassword
    };
    const newUser = new User(newUserData);
    await newUser.save();
    return newUser;
}

const getAllUsers = async (limit, skip) => {
    const users = await User.find({}, { '__v': false, 'password': false }).skip(skip).limit(limit);
    return users;
}

const getUserById = async (userId) => {
    const user = await User.findById(userId, { '__v': false, 'password': false });
    return user;
}

// جلب بيانات المستخدم بدون كلمة المرور (للعرض العام)
const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email }, { '__v': false, 'password': false });
    return user;
}

// دالة جديدة: جلب بيانات المستخدم مع كلمة المرور (خاصة بعملية الـ Login)
const getUserByEmailWithPassword = async (email) => {
    const user = await User.findOne({ email: email }, { '__v': false });
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

const updateUserPassword = async (email, hashedPassword) => {
    const user = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { runValidators: true, returnDocument: 'after' });
    return user;
}

module.exports = { 
    createUser, 
    getAllUsers, 
    getUserById, 
    getUserByEmail, 
    getUserByEmailWithPassword, 
    updateUserById, 
    deleteUserById, 
    updateUserPassword 
};