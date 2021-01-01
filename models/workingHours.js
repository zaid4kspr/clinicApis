// models/workingHours

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const session = new Schema({

    startHour: String,
    endHour: String,

});

const day = new Schema
    ({

        sessions: [session],
        day: {
            type: Number,
            min: 0,
            max: 6
        },

        ouvert: {
            type: Number,
            default: 1
        },

    }
    );


const workingHoursSchema = new Schema(
    {
        duration: Number,
        doctor: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
        workingHours: [day]
    }
)


module.exports = mongoose.model('WorkingHours', workingHoursSchema);