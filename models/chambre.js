// models/rdv.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chambreSchema = new Schema({


    patients: [{
        type: Schema.Types.ObjectId, ref: 'User', required: true
    }]
    ,

    // 1 libre 2 full 
    status: {
        type: Number,
        default: 1
    },
    numChambre: {
        type: Number,
    },
    etage: {
        type: Number,
    },
    nbBed: {
        type: Number,
    },


});
module.exports = mongoose.model('Chambre', chambreSchema);