// models/Location.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctorStatsSchema = new Schema({

    date: { type: Date,  default: new Date() },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },



    //1 stats de presence  // 2  tentative d'appel  //  3 tentative de prise rdv
    type: {
        type: Number,
        required: true
    }


});
module.exports = mongoose.model('DoctorStats', doctorStatsSchema);