// Require the NPM pakages that we need
const dotenv = require('dotenv');
dotenv.config(); //connection env file
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: process.env.EMAIL_PORT,
    secure: false, //true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, //admin gmail id
        pass: process.env.EMAIL_PASS, //admin gmail password
    },
})
module.exports = transporter;