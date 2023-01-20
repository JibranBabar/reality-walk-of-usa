const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String , required: true , trim: true},
    email: {type: String , required: true , trim: true , unique: true , lowercase: true},
    password: {type: String , required: true , unique: true , trim: true},
    is_admin: {type: Number , required: true , trim: true},
    is_varified: {type: Number, default: 0},
    tokens:[{type: Object}]
}, { timestamps: true });

const User = mongoose.model("user" , userSchema);
module.exports = User;