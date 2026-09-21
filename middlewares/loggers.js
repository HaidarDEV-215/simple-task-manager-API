const urlLogger = (req,res,next)=>{
    console.log(`${req.method} ${req.protocol}://${req.hostname}:${req.port}${req.originalUrl}`);
    next();
}




module.exports={urlLogger}