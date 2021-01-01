// models/doctorSpecialty.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctorSpecialtySchema = new Schema({
    name: String,


});
module.exports = mongoose.model('DoctorSpecialty', doctorSpecialtySchema);