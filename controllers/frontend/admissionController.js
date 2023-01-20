// Import files that we need
const Admission = require('../../models/frontend/addmissionFormModel.js');
// Define authentication controller functions
class admissionController{
    // Define function for user apply for admission
    static userAdmission = async (req , res) => {
        const {firstname , lastname , email , cnic , fathername , address , phone , gender , interdegree , intermark , campus , degree} = req.body;
        const data = await Admission.findOne({cnic:cnic});
        if(data){
            res.send({status : "failed" , message : "You are already apply for admission" , title: 'Admission'})
        }else{
            if(firstname && lastname && email && cnic && fathername && address && phone && gender && interdegree && intermark && campus && degree){
                try {
                    const admission = new Admission(req.body);
                    await admission.save();
                    return res.status(201).render('frontend/index' , {"status" : "success" , "message" : "Admission Apply Successfully" , title: 'Home'})
                } catch (error) {
                    res.render('frontend/index' , {"status" : "failed" , "message" : "Admission has been failed" , title: 'Home'})
                }
            }else{
                res.send({"status" : "failed" , "message" : "All fields are required" , title: 'Admission'})
            }
        }
    }
}

module.exports = admissionController
