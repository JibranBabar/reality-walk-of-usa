const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
{
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    cnic: { type: String, required: true, trim: true, unique: true},
    fathername: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    gender: { type: String, required: true },
    interdegree: { type: String, required: true, trim: true },
    intermark: { type: Number, required: true, trim: true },
    campus: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    // created: { type: Date, required: true , default: Date.now },
}, { timestamps: true });

const Admission = mongoose.model("admission", admissionSchema);
module.exports = Admission;
