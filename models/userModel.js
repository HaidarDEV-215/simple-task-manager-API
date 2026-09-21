const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const userModel = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [isEmail, "this email is not valid!"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        require: true
    },

}, {
    timestamps: true
})

// userModel.methods.generateToken = async function(){
//     return await jwt.sign({email:this.email,id:this._id,isAdmin:this.isAdmin},process.env.SECRET_KEY,{expiresIn:'30d'});
// }
// in control type:  user.generateToken();

module.exports = mongoose.model('User',userModel);