const index_Controller = async(req , res) => {
    res.render('frontend/index' , {title : 'Home'})
}

const courses_Controller = (req , res) => {
    res.render('frontend/courses' , {title : 'Courses'})
}

const admission_Controller = (req , res) => {
    res.render('frontend/admission' , {title : 'Admission'})
}

const virtualTour_Controller = (req , res) => {
    res.render('frontend/virtual-tour' , {title : 'Virtual Tour'})
}

const events_Controller = (req , res) => {
    res.render('frontend/events' , {title : 'Page || Events'})
}

const teacher_Controller = (req , res) => {
    res.render('frontend/teachers' , {title : 'Page || Teachers'})
}

const scholarship_Controller = (req , res) => {
    res.render('frontend/scholarship' , {title : 'Page || Scholarship'})
}

const courseDetails_Controller = (req , res) => {
    res.render('frontend/courses' , {title : 'Page || Courses Details'})
}

const about_Controller = (req , res) => {
    res.render('frontend/about' , {title : 'About Us'})
}
const contact_Controller = (req , res) => {
    res.render('frontend/contact-us' , {title : 'Contact Us'})
}


const userResetPassword = (req , res) => {
    res.render('frontend/resetpassword' , {title : 'ForgotPassword'})
}

module.exports = {
    index_Controller,
    courses_Controller,
    admission_Controller,
    virtualTour_Controller,
    teacher_Controller,
    events_Controller,
    scholarship_Controller,
    courseDetails_Controller,
    about_Controller,
    contact_Controller,
    userResetPassword,
}