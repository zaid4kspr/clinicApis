
const Rdv = require('../models/rdv');
const User = require('../models/user');




const ObjectId = require('mongoose').Types.ObjectId;


exports.docStats4RdvPerMonth = function (req, res, next) {
    Rdv.aggregate(
        [
            {
                $match: {
                    $and: [
                        {
                            "rdvDate": {
                                "$lte": new Date()
                            }
                        },
                        { "doctor": ObjectId(req.query.doctor) },
                    ]


                }


            },
            {
                "$group": {
                    // "_id": { month: { $month : "$date" } ,year:{ $year : "$date"} },
                    "_id": { $dateToString: { format: "%Y-%m", date: "$rdvDate" } },
                    "count": { "$sum": 1 }

                }
            }
            ,
            { $sort: { _id: -1 } },
            { $limit: 5 }

        ],
        function (err, result) {
            // do something with result
            res.status(200).json(result.reverse())

        }
    );

}

exports.countRdvBySexe = function (req, res, next) {


    Rdv.find({ doctor: req.query.doctor })
        .populate('patient', {

            match: { sexe: { $eq: 0 } },
        })
        .exec(function (err, users) {
            res.status(200).json(users);
        });



}

exports.updateRdvStatus = function (req, res, next) {
    const status = req.body.status;

    Rdv.findOneAndUpdate(
        { _id: req.query.id },
        {
            status: status,
        },
        { new: true }).populate("doctor patient").then(d => {


            return res.status(200).json({ msg: "sucess" })
        }).catch(err => {
            return res.status(400).json(err)

        });





}

