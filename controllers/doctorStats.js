
const DoctorStats = require('../models/doctorStats');
const Rdv = require('../models/rdv');

const ObjectId = require('mongoose').Types.ObjectId;


exports.docStats4ProfileView = function (req, res, next) {




    DoctorStats.aggregate(
        [
            {
                $match: {

                    $and: [
                        { "type": parseInt(req.query.type) },
                        {
                            "date": {
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
                    "_id": { $dateToString: { format: "%Y-%m", date: "$date" } },
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


exports.docStatsProfileViewsAnswersAndRdv = async function (req, res, next) {

    var rdvNumber = await Rdv.countDocuments({ doctor: req.query.doctor })
    var provileViewsNumber = await DoctorStats.countDocuments({ doctor: req.query.doctor, type: 1 })

    res.status(200).json({
        rdvNumber,
        provileViewsNumber
    })


}