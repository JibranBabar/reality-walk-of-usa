// Import files that we need
const User = require('../../models/auth/authModel.js');
const Admission = require('../../models/frontend/addmissionFormModel.js');
const transporter = require('../../config/emailConfig.js');

const dashboard_Controller = async(req , res) => {
    User.find().sort({createdAt: 1})
    .then((result) => {
        res.render('admin/index' , {title : 'Dashboard' , users: result})
    })
    .catch((err) => {
        console.log(err);
    });
}

const admission_Controller = async(req , res) => {
    Admission.find().sort({createdAt: 1})
    .then((result) => {
        res.render('admin/admission-list' , {title : 'Admissions request' , admissions: result})
    })
    .catch((err) => {
        console.log(err);
    });
}

const approved_Controller = async (req , res) => {
    let id = req.params.id
    const data = await Admission.findOne({_id:id});
    if(data != null) {
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: data.email,
            subject: "Admission Approval",
            html: `Your Application is submit.Please visit university for futher process.`
        })
        res.json({redirect: '/admin/admin-admission-list'})
    }
    else {
        res.send({"status" : "failed" , "message" : "Email doesn't exits"});
    }
}

const declined_Controller = async(req , res) => {
    let id = req.params.id
    const data = await Admission.findOne({_id:id});
    if(data != null) {
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: data.email,
            subject: "Admission Approval",
            html: `Your Admission is declined.Please try next time.`
        })
        res.json({redirect: '/admin/admin-admission-list'})
    }
    else {
        res.send({"status" : "failed" , "message" : "Email doesn't exits"});
    }
}

const team_Controller = async(req , res) => {
    res.render('admin/team' , {title : 'Team'})
}

const profile_Controller = async(req , res) => {
    res.render('admin/user-profile' , {title : 'User Profile'})
}

const map_Controller = async(req , res) => {
    res.render('admin/usa-maps' , {title : 'Profile'})
}

const editUser_Controller = async(req , res) => {
    let id = req.params.id;
    User.findById(id , (err , user) => {
        if (err) {
            res.redirect("admin/index");
        } else {
            if (user == null) {
                res.redirect("/admin/admin-dashboard");
            } else {
                res.render("admin/updateUser" , {title : 'Edit User' , user:user})
            }
        }
    });
}

const updateUser_Controller = async(req , res) => {
    let id = req.params.id;
    if(!id) {
        res.status(400).send({"status" : "failed" , 'message': 'User details not found'})
    }
    User.findByIdAndUpdate(id, {
        name:req.body.name,
        email:req.body.email,
        is_admin:req.body.is_admin,
        is_varified:req.body.is_varified,
    }, (err , result) => {
        if(err) {
            res.json({message: err.message , type: 'danger'});
        } else {
            res.redirect('/admin/admin-dashboard')
        }
    });    
}

// Delete The user
const userDelete_Controller = async(req , res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/admin/admin-dashboard'})
        })
        .catch(err => {
            console.log(err);
        });
}

const page_Controller = async(req , res) => {
    res.render('admin/404' , {title : '404'})
}

const getSearch_Controller = async(req , res) => {
    console.log('search');
    const users = await User.find(
        {
            "$or":[
                {'name':{$regex:req.params.key}},
            ]
        }
    )
    
    console.log(users);
    return res.status(200).send({title : 'Dashboard' , users:users});
}

module.exports = {
    dashboard_Controller,
    admission_Controller,
    team_Controller,
    profile_Controller,
    map_Controller,
    page_Controller,
    editUser_Controller,
    updateUser_Controller,
    userDelete_Controller,
    approved_Controller,
    declined_Controller,
    getSearch_Controller,
}
