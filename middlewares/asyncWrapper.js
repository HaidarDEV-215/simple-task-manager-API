module.exports = (asyncFunction)=>{
    return (req,res,next)=>{
        asyncFunction(req,res,next).catch((error)=>{
            console.error(error);
            next(error);
        })
    }
}
