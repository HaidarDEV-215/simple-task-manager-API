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

const authRequestsLimitter = rateLimit({
    windowMs: 60*60*1000, //one hour
    limit: 5,
    standardHeaders:"draft-8",
    legacyHeaders:false,
    ipv6Subnet:56,
    skip:(req,res)=>false,
    handler:(req,res,next,options)=>{
        res.status(options.statusCode).json({error:"you reach your limit",message:"try again latter",code:options.statusCode});
    }
})


module.exports = {requestLimiter,authRequestsLimitter};
