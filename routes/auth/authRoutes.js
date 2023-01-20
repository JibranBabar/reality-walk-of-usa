// Require the NPM pakages that we need
const express = require('express');
// Import the auth controller
const authController = require('../../controllers/auth/authController.js');
// Import auth middleware for user verified or not
const checkUserAuth = require('../../middlewares/auth/authMiddleware.js')
// Initalise a express auth routes 
const auth_router = express.Router();
// Route Level Middleware - To Protect Route
// auth_router.use('/changepassword' , checkUserAuth);
// auth_router.use('/loggeduser' , checkUserAuth);
// auth_router.use('/logoutuser' , checkUserAuth);
// Public Routes
// auth_router.get('/registration' , authController.loadRegistration);
auth_router.post('/register' , authController.userRegistration);
auth_router.post('/login' , authController.userLogin);
auth_router.post('/send-request-password-forward' , authController.sendUserPasswordResetEmail);//email link
auth_router.post('/request-password/:id/:token' , authController.userPasswordReset);
// Protected Routes
auth_router.post('/changepassword' , authController.changeUserPassword);
auth_router.get('/loggeduser' , authController.loggedUser);
auth_router.get('/logoutuser' , authController.logoutUser);

module.exports = auth_router;