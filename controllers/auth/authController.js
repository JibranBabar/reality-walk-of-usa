// Require the NPM pakages that we need
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Import files that we need
const User = require('../../models/auth/authModel.js');
const transporter = require('../../config/emailConfig.js');
// Define authentication controller functions
class authController{
    // Define function for user registered
    static userRegistration = async (req , res) => {
        const {name , email , password , password_confirmation} = req.body;
        const data = await User.findOne({email:email});
        if(data){
            res.send({status : "failed" , message : "Email already exits" , title: 'Home'})
        }else{
            if(name && email && password && password_confirmation){
                if(password === password_confirmation){
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password , salt);
                        const doc = new User({
                            name: name,
                            email: email,
                            password:hashPassword,
                            is_admin:0
                        })
                        await doc.save();
                        const save_user = await User.findOne({email:email})
                        // Generate JWT Token
                        const token = jwt.sign({userID:save_user._id} , process.env.JWT_SECRET_KEY , {expiresIn : '1d'});
                        res.status(201).render('frontend/index' , {"status" : "success" , "message" : "Registration Successfully" , "token" : token , title: 'Home'})
                    } catch (error) {
                        res.render('frontend/index' , {"status" : "failed" , "message" : "Registration has been failed" , title: 'Home'})
                    }
                }else{
                    res.send({"status" : "failed" , "message" : "Password and Confirmation Password doesn't match" , title: 'Home'})
                }
            }else{
                res.send({"status" : "failed" , "message" : "All fields are required" , title: 'Home'})
            }
        }
    }

    static userLogin = async (req , res) => {
        try {
            const {email , password} = req.body;
            if (email && password) {
                const data = await User.findOne({email:email});
                if (data != null) {
                    const isMatch = await bcrypt.compare(password , data.password);
                    if ((data.email === email) && isMatch) {
                        // Generate JWT Token
                        const token = jwt.sign({userID:data._id, name:data.name} , process.env.JWT_SECRET_KEY , {expiresIn : '1d'});
                        let oldTokens = data.tokens || []
                        if(oldTokens.length){
                            oldTokens = oldTokens.filter(t => {
                                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000
                                if(timeDiff < 2400){
                                    return t
                                }
                            })
                        }
                        await User.findByIdAndUpdate(data._id , {tokens: [...oldTokens, {token , signedAt: Date.now().toString()}]})
                        
                        res.send({"status" : "success" , "message" : "Login Successfully" ,  data: data , token : token , title: 'Home'});
                    } else {
                        res.send({"status" : "failed" , "message" : "Email or Password is not Valid" , title: 'Home'});
                    }
                } else {
                    res.send({"status" : "failed" , "message" : "You are not a registered user" , title: 'Home'});
                }
            } else {
                res.send({"status" : "failed" , "message" : "All fields are required" , title: 'Home'});
            }
        } catch (error) {
            res.send({"status" : "failed" , "message" : "Unable to Login" , title: 'Home'});
        }
    }

    static changeUserPassword = async (req , res) => {
        const {password , password_confirmation, user_id} = req.body;
        if (password && password_confirmation) {
            if (password !== password_confirmation) {
                res.send({"status" : "failed" , "message" : "New Password and Confirm New Password doesn't match"});
            } else {
                const salt = await bcrypt.genSalt(10);
                const newHashPassword = await bcrypt.hash(password , salt);
                await User.findByIdAndUpdate(user_id, {$set: {password: newHashPassword}});
                res.send({"status" : "sucsess" , "message" : "Password change successfully"});
            }
        } else {
            res.send({"status" : "failed" , "message" : "All fields are required"});
        }
    }

    static loggedUser = async(req , res) => {
        res.render('frontend/index',{"User":req.User});
    }

    static sendUserPasswordResetEmail = async (req , res) => {
        const {email} = req.body;
        if (email) {
            const data = await User.findOne({email: email});
            if (data) {
                const secret = data._id + process.env.JWT_SECRET_KEY;
                const token = jwt.sign({userID: data._id} , secret , {expiresIn: '1d'});
                const link = `http://localhost:4052/reset-password/${data._id}/${token}`;
                // SEND Email
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: data.email,
                    subject: "Password Reset Link",
                    html: `<a href=${link}>Click Here</a> to reset Your Password`
                })
                res.send({"status" : "success" , "message" : "Password Reset Email Sent... Please Check Your Email" , info : info})
            } else {
                res.send({"status" : "failed" , "message" : "Email doesn't exits"});
            }
        } else {
            res.send({"status" : "failed" , "message" : "Email field is required"});
        }
    }

    static userPasswordReset = async (req , res) => {
        const {password , password_confirmation} = req.body;
        const {id , token} = req.params;
        const data = await User.findById(id);
        const new_secret = data._id + process.env.JWT_SECRET_KEY;
        try {
            jwt.verify(token , new_secret);
            if (password && password_confirmation) {
                if (password !== password_confirmation) {
                    res.send({"status" : "failed" , "message" : "New Password and Confirm New Password doesn't match"})
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const newHashPassword = await bcrypt.hash(password , salt);
                    await User.findByIdAndUpdate(data._id , {$set: {password: newHashPassword}});
                    res.send({"status" : "sucsess" , "message" : "Password change successfully"});
                }
            } else {
                res.send({"status" : "failed" , "message" : "All fields are required"});
            }
        } catch (error) {
            console.log(error);
            res.send({"status" : "failed" , "message" : "Invalid Token"});
        }
    }

    static logoutUser = async (req , res) => {
        req.session.destroy();
        res.send({"status" : "success" , "message" : "Logout Successfully" , title : 'Home'});
    }
}

module.exports = authController