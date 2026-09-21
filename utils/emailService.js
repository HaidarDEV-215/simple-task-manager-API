const AppError = require('./appError.js');
const statusText = require('./statusText.js');
const nodeMailer = require('nodemailer');

module.exports = (userEmail,subject,content)=>{
    const transporter = nodeMailer.createTransport({
        auth:{
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD
        },
        host: "smtp.gmail.com",
        port: 587,
        secure: false
    })

    const mailOptions = {
        email : process.env.APP_EMAIL,
        to : userEmail,
        subject : subject,
        html : content
    }

    transporter.sendMail(mailOptions,(error,success)=>{
        if(error){
            return new AppError(error.message,500,statusText.ERROR);
        }
        else{
            return true;
        }
    })
}