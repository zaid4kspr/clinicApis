// models/rdv.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rdvSchema = new Schema({

    rdvDate: { type: Date, required: true },
    bookingDate: { type: Date, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //1 waiting 2 accepted 3 refused 4 annuler par le patient
    status: {
        type:Number,
        default:1
    }



});
module.exports = mongoose.model('Rdv', rdvSchema);