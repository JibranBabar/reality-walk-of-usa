const userModel = require('../../models/auth/authModel.js');
const jwt = require('jsonwebtoken');
var checkUserAuth = async (req , res , next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get Token from header
            token = authorization.split(' ')[1];
            // Verify Token 
            const {userID} = jwt.verify(token , process.env.JWT_SECRET_KEY);
            // Get User from Token
            req.user = await userModel.findById(userID).select('-password');
            req.token = token;
            req.user = user;
            req.session.authcheck = true;
            next()
        } catch (error) {
            console.log(error);
            req.session.authcheck = false;
            res.status(401).send({"status" : "failed" , "message" : "Unauthorized User"});
        }
    }
    if (!token) {
        req.session.authcheck = false;
        res.status(401).send({"status" : "failed" , "message" : "Unauthorized User , No Token"});
    }
}
module.exports = checkUserAuth;

