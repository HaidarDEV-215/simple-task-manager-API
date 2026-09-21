const jwt = require('jsonwebtoken');

module.exports = async (payload,expiresAt="30d")=>{
    const token = await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:`${expiresAt}`});
    return token;
}