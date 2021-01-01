
const DoctorSpecialty = require('../models/doctorSpecialty');

exports.getDoctorSpecialty = function (req, res, next) {
    query = {}


    DoctorSpecialty.find(query).sort({ name: 1 })
        .exec((err, doc) => {
            if (err) {
                return res.status(400).json(err)
            }
            return res.status(200).json(doc)
        })
}

exports.addDoctorSpecialty = function (req, res, next) {

    const doctorSpecialty = new DoctorSpecialty();
    doctorSpecialty.save().then(user => res.status(400).json(user))
        .catch(err => res.status(400).json(err));

}
