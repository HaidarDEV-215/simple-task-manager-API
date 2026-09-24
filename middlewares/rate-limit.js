const {rateLimit} = require('express-rate-limit');

const requestLimiter = rateLimit({
    windowMs: 15*60*1000, //15 minutes
    limit: 100, // 100 requist for each window (15 min)
    standardHeaders:"draft-8",
    legacyHeaders:false,
    ipv6Subnet:56,
    skip:(req,res)=>false,
    handler:(req,res,next,options)=>{
        res.status(options.statusCode).json({error:"you reach your limit",message:"try again latter",code:options.statusCode})
    }
})

const baseAuthLimiter = {
    windowMs: 60 * 60 * 1000, // 1 hour
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            error: "you reached your limit",
            message: "try again later",
            code: options.statusCode
        });
    }
};

// إنشاء عداد منفصل لكل عملية
const loginLimiter = rateLimit({ ...baseAuthLimiter, limit: 5 });
const registerLimiter = rateLimit({ ...baseAuthLimiter, limit: 3 });
const forgetPasswordLimiter = rateLimit({ ...baseAuthLimiter, limit: 3 });
const confirmOTPLimiter = rateLimit({ ...baseAuthLimiter, limit: 5 });
const resetPasswordLimiter = rateLimit({ ...baseAuthLimiter, limit: 5 });

module.exports = {
    loginLimiter,
    registerLimiter,
    forgetPasswordLimiter,
    confirmOTPLimiter,
    resetPasswordLimiter,
    requestLimiter
};
