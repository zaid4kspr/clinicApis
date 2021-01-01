// models/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');




const UserSchema = new Schema(
    {
        name: String,
        lastName: String,
        firstName: String,
        //0 M // 1 W
        sexe: {
            type: Number,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        photoUrl: {
            type: String,
        },
         address: {
            type: String,
        }, 
        ville: {
            type: String,
        },
        //added by Z
        birthday: { type: Date },
        numConseilOrdre: { type: String },
        tel: { type: String },
        fix: { type: String },
        desc: { type: String },
        //added by O
        //0 | 1  
        doctor: {
            type: Number,
            default: 0
        },

        doctorSpecialty: { type: Schema.Types.ObjectId, ref: 'DoctorSpecialty', required: false },
        doctorSpecSecond: { type: Schema.Types.ObjectId, ref: 'DoctorSpecialty', required: false },

        paymentMethod: [],
        activePriseRdv: { type: Boolean, default: true },
        education: [
            {
                degree: { type: String },
                college: { type: String },
                year: { type: String }
            }
        ],

    },
    {
        timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
    });
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);