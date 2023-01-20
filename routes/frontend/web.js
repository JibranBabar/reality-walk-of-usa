const express = require('express');
const homeController = require('../../controllers/frontend/homeController.js');
const admissionController = require('../../controllers/frontend/admissionController.js');
const checkUserAuth = require('../../middlewares/auth/authMiddleware.js')
const router = express.Router();
// Route Level Middleware - To Protect Route
// router.use('/' , checkUserAuth);

router.get('/' , homeController.index_Controller);
router.post('/admissionapply' , admissionController.userAdmission);
router.get('/courses' , homeController.courses_Controller);
router.get('/admission' , homeController.admission_Controller);
router.get('/virtual-tour' , homeController.virtualTour_Controller);
router.get('/events' , homeController.events_Controller);
router.get('/teachers' , homeController.teacher_Controller);
router.get('/scholarship' , homeController.scholarship_Controller);
router.get('/course-details' , homeController.courseDetails_Controller);
router.get('/about' , homeController.about_Controller);
router.get('/contact-us' , homeController.contact_Controller);
router.get('/reset-password/:id/:token' , homeController.userResetPassword);


module.exports = router;