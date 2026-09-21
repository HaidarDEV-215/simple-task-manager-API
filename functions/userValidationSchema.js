const {body} = require('express-validator');

const UserValidationSchema = ()=>{
    return ([
        body(firstName)
            .isLength({min:3,max:20})
            .notEmpty()
            .withMessage("first name length must be bitween 3 and 20 character and cannot be empty")
        ,body(lattName)
            .isLength({min:3,max:20})
            .notEmpty()
            .withMessage("last name length must be bitween 3 and 20 character and cannot be empty")
        ,body(email)
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("email address is not valid")
        ,body(password)
            .notEmpty()
            .withMessage("password cannot be empty")
            .isLength({min:8,max:16})
            .withMessage("password length must be between 8 and 16 character")
    ])
}

module.exports = UserValidationSchema;