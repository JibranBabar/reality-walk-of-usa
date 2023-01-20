// Require the NPM pakages that we need
const express = require('express');
// Import the auth controller
const adminController = require('../../controllers/admin/adminController.js');
// Initalise a express auth routes 
const admin_router = express.Router();
// Public Routes
admin_router.get('/admin-dashboard' , adminController.dashboard_Controller);
admin_router.get('/admin-admission-list' , adminController.admission_Controller);
admin_router.get('/admin-team' , adminController.team_Controller);
admin_router.get('/admin-profile' , adminController.profile_Controller);
admin_router.get('/admin-map' , adminController.map_Controller);
admin_router.get('/editUser/:id' , adminController.editUser_Controller);
admin_router.post('/updateUser/:id' , adminController.updateUser_Controller);
admin_router.post('/approvedUser/:id' , adminController.approved_Controller);
admin_router.post('/declinedUser/:id' , adminController.declined_Controller);
admin_router.delete('/deleteUser/:id' , adminController.userDelete_Controller);
admin_router.get('/search-user/:key' , adminController.getSearch_Controller);
admin_router.get('' , adminController.page_Controller);

module.exports = admin_router;
