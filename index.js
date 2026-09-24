require ('dotenv').config();
const cors = require('cors');
const express = require("express");
//const { default: mongoose } = require('mongoose');
//const AppError = require('./utils/appError.js');
//const statusText = require('./utils/statusText.js');

const app = express();
const logers = require('./middlewares/loggers.js');
const errors = require('./middlewares/errors.js');
const connectToMongoDB = require('./config/mongoDB.js');
const {requestLimiter} = require('./middlewares/rate-limit.js');

// const tasksRouter = require('./routes/tasksRouter.js');
// const usersRouter = require('./routes/usersRouter.js');
// const authRouter = require('./routes/authRouter.js');

app.use(cors());
app.use(requestLimiter);
app.use(express.json());
app.use(logers.urlLogger);
/*
app.use("/api/users",usersRouter);
app.use("/api/tasks",tasksRouter);
 */
app.use("/api/users",require('./routes/usersRouter.js'));
app.use("/api/tasks", require('./routes/tasksRouter.js'));
app.use("/api/auth", require('./routes/authRouter.js'));


const port = process.env.PORT;

// mongoose.connect(process.env.MONGO_URL)
// .catch((error)=>{
//     console.log('error connection accuired\n',error.message);
// })
// .then(()=>{
//     console.log(`dataBase connected successfully`);
// })
///////////////
// app.all(/.*/,(req,res,next)=>{
//     res.status(404).json({msg:"page not found!",statusText:statusText.FAIL,data:null})
// })
///////////////
// app.use((error,req,res,next)=>{
//     res.status(error.statusCode || 500).json({msg:error.message || "enternal server error",statusText:error.statusText || statusText.ERROR,data:null})
// })



//middlewares chain test

// app.use("/api/test",(req,res,next)=>{
//     const error = new AppError("this is a test",300,statusText.SUCCESS);
//     console.log("teest");
    
//     next(error);
// })


//new error handler method

connectToMongoDB();

app.all(/.*/,errors.notFoundError);

app.use(errors.ErrorHandler);


app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})