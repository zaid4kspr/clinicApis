const User = require('../models/user');
const WorkingHours = require('../models/workingHours');
//added by z
const bcrypt = require('bcryptjs');
// BcryptJS is a no setup encryption tool
require('dotenv').config();
const secret = process.env.SECRET || 'pw';
const passport = require('passport');
const jwt = require('jsonwebtoken');







const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});






exports.register = function (req, res, next) {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length) {
                let error = 'Email already exists.';
                return res.status(400).json(error);
            } else {
                const newUser = new User({
                    name: req.body.firstName + " " + req.body.lastName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    sexe: req.body.sexe,
                    email: req.body.email,
                    password: req.body.password,
                    birthday: req.body.birthday,
                    tel: req.body.tel,
                    doctor: req.body.doctor,
                    photoUrl: req.body.photoUrl,
                    doctorSpecialty: req.body.doctorSpecialty,
                    city: req.body.city,
                    address: req.body.address,
                    numConseilOrdre: req.body.numConseilOrdre,

                });

                //added by zaid
                if (req.body.password) {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;
                        bcrypt.hash(newUser.password, salt,
                            (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save().then(user => {
                                    res.json(user)
                                    if (req.body.doctor) {
                                        var workingHours = new WorkingHours(
                                            {
                                                "workingHours": [
                                                    {
                                                        "sessions": [
                                                            {
                                                                "startHour": "08:00",
                                                                "endHour": "12:00"
                                                            },
                                                            {
                                                                "startHour": "14:00",
                                                                "endHour": "18:00"

                                                            }
                                                        ],
                                                        "day": 0,
                                                        "ouvert": 1
                                                    },
                                                    {
                                                        "sessions": [
                                                            {
                                                                "startHour": "08:00",
                                                                "endHour": "12:00"

                                                            },
                                                            {
                                                                "startHour": "14:00",
                                                                "endHour": "18:00"

                                                            }
                                                        ],
                                                        "day": 1,
                                                        "ouvert": 1
                                                    },
                                                    {
                                                        "sessions": [
                                                            {
                                                                "startHour": "08:00",
                                                                "endHour": "12:00"

                                                            },
                                                            {
                                                                "startHour": "14:00",
                                                                "endHour": "18:00"

                                                            }
                                                        ],
                                                        "day": 2,
                                                        "ouvert": 1
                                                    },
                                                    {
                                                        "sessions": [
                                                            {
                                                                "startHour": "08:00",
                                                                "endHour": "12:00"
                                                            },
                                                            {
                                                                "startHour": "14:00",
                                                                "endHour": "18:00"
                                                            }
                                                        ],
                                                        "day": 3,
                                                        "ouvert": 1
                                                    },
                                                    {
                                                        "sessions": [
                                                            {
                                                                "startHour": "08:00",
                                                                "endHour": "12:00"
                                                            },
                                                            {
                                                                "startHour": "14:00",
                                                                "endHour": "18:00"
                                                            }
                                                        ],
                                                        "day": 4,
                                                        "ouvert": 1
                                                    },
                                                    {
                                                        "sessions": [
                                                            {
                                                                "startHour": "08:00",
                                                                "endHour": "12:00"
                                                            },
                                                            {
                                                                "startHour": "14:00",
                                                                "endHour": "18:00"
                                                            }
                                                        ],
                                                        "day": 5,
                                                        "ouvert": 1
                                                    },
                                                    {
                                                        "sessions": [
                                                            {
                                                                "startHour": "08:00",
                                                                "endHour": "12:00"
                                                            },
                                                            {
                                                                "startHour": "14:00",
                                                                "endHour": "18:00"
                                                            }
                                                        ],
                                                        "day": 6,
                                                        "ouvert": 1
                                                    }
                                                ],
                                                "duration": 30,
                                                "doctor": user._id
                                            }
                                        );
                                        workingHours.save()
                                    }


                                })
                                    .catch(err => res.status(400).json(err));

                            });
                    });
                } 
                
         
            }
        })
}

exports.loginWithPassword = async function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;
    var errors = {
        msg: ''
    }
    var payload = {
        id: null,
        name: null
    };
    User.findOne({ email })
        .then(user => {
            if (!user || user == null) {
                errors.msg = "No Account Found";
                return res.status(404).json(errors);

            } else {
                //&& user.id == req.body.id

                if (user.password) {
                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if (isMatch) {

                                if (user.isSecretary) {
                                    User.findOne({ _id: user.isSecretaryOfDoctor }).then(d => {
                                        d["loggedInSecretaryInfo"] = user
                                        user = d
                                        payload.id = user._id
                                        payload.name = user.name
                                        jwt.sign(payload, secret, { expiresIn: 36000 },
                                            (err, token) => {
                                                if (err) res.status(500)
                                                    .json({
                                                        error: "Error signing token",
                                                        raw: err
                                                    });
                                                res.json({
                                                    success: true,
                                                    user: {
                                                        lastName: user.lastName,
                                                        name: user.name,
                                                        _id: user._id,
                                                        email: user.email,
                                                        birthday: user.birthday,
                                                        tel: user.tel,
                                                        doctor: user.doctor,
                                                        photoUrl: user.photoUrl,
                                                        loggedInSecretaryInfo: user.loggedInSecretaryInfo,
                                                        isSecretary: true,
                                                        firstLoginDone: user.firstLoginDone,


                                                    },
                                                    token: `Bearer ${token}`
                                                });
                                            });
                                    })
                                } else {
                                    payload.id = user._id
                                    payload.name = user.name
                                    jwt.sign(payload, secret, { expiresIn: 36000 },
                                        (err, token) => {
                                            if (err) res.status(500)
                                                .json({
                                                    error: "Error signing token",
                                                    raw: err
                                                });
                                            res.json({
                                                success: true,
                                                user: {
                                                    lastName: user.lastName,
                                                    name: user.name,
                                                    _id: user._id,
                                                    email: user.email,
                                                    birthday: user.birthday,
                                                    tel: user.tel,
                                                    doctor: user.doctor,
                                                    photoUrl: user.photoUrl,
                                                    firstLoginDone: user.firstLoginDone,


                                                },
                                                token: `Bearer ${token}`
                                            });
                                        });
                                }


                            } else {
                                errors.msg = "Password is incorrect";
                                res.status(400).json(errors);
                            }
                        });
                }
            }
        }).catch(err => {
            errors.msg = "User Not Found",
                res.status(404)
                    .json(errors)
        })
}





exports.firstLoginDone = function (req, res, next) {
    User.findOneAndUpdate({ _id: req.query.id }, {
        firstLoginDone: true,

    }, { new: true }, (err, doc) => {

        doc["password"] = ""

        if (err) {
            return res.status(400).json(err)
        }

        res.status(200).json(doc)
    });

}



exports.updateUser = function (req, res, next) {

    User.findOneAndUpdate({ _id: req.query.id },
        {
            name: req.body.firstName + " " + req.body.lastName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            sexe: req.body.sexe,
            email: req.body.email,
            birthday: req.body.birthday,
            tel: req.body.tel,
            ville: req.body.ville,
            address: req.body.address,

        },
        { new: true }, (err, doc) => {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(doc)
        });
}
exports.updateDoctor = async function (req, res, next) {
    var updatedUser = {}


    for (const property in req.body) {
        if (req.body["" + property]) {
            updatedUser["" + property] = req.body["" + property]
        }

    }
    if (req.body.firstName || req.body.lastName) {
        updatedUser["name"] = req.body.firstName + " " + req.body.lastName

    }

    if (req.body.longitude
        && req.body.latitude) {
        updatedUser["geoLocation"] = {
            "type": "Point",
            "coordinates": [
                parseFloat(req.body.longitude),
                parseFloat(req.body.latitude)
            ]
        }
    }




    User.findOneAndUpdate({ _id: req.query.id },
        updatedUser,
        { new: true }, (err, doc) => {
            if (err) {
                return res.status(400).json(err)
            }
            return res.status(200).json(doc)
        });
}

exports.updatePw = function (req, res, next) {
    const pw = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pw, salt, (err, hash) => {

            User.findOneAndUpdate({ _id: req.body.id },
                {
                    password: hash,
                },
                { new: true }, (err, doc) => {
                    if (err) {
                        return res.status(400).json(err)
                    }
                    res.status(200).json({ msg: "sucess" })
                });
        });
    });

}

exports.getUserById = function (req, res, next) {

    User.findById(req.query.id)
        .populate("doctorSpecialty city doctorSpecSecond ")
        .then((result) => {
            result.password = ""
            res.status(200).json(result);
        }).catch(err => {
            res.status(404).json(err);

        });


    ;
}

exports.autoCompleteDoctor = function (req, res, next) {

    var keyword = req.query.keyword;
    User
        .find(
            {
                doctor: 1, name: { $regex: '.*' + keyword + '.*', $options: 'i' },

            }, "_id name photoUrl doctorSpecialty city"
        ).populate('doctorSpecialty city')
        .limit(5)
        .select()
        .exec()
        .then((result) => {
            const response = result;
            res.status(200).json(response);
        }).catch(err => {
            res.status(404).json(err);

        });


}




const mongoosePaginate = require('mongoose-paginate-v2');



exports.filterDoctors = function (req, res, next) {
try {
    

    var queryOptions = { page: req.params.pageIndex, limit: 10, sort: { createdAt: -1 } }
    var query = {
    };
    var doctor = 1
    var doctorSpecialty = req.body.doctorSpecialtyId

    var sexe = req.body.sexe
    var page = req.body.pageIndex


    query["doctor"] = doctor;
    query["activePriseRdv"] = true;



    if (doctorSpecialty) {
        query["doctorSpecialty"] = doctorSpecialty;
    }

 


    const options = {
        page: req.body.pageIndex + 1,
        limit: 10,
        populate: ' doctorSpecialty',
    };
    User.paginate(query, options, function (err, result) {
        // result.docs
        // result.totalDocs = 100
        // result.limit = 10
        // result.page = 1
        // result.totalPages = 10
        // result.hasNextPage = true
        // result.nextPage = 2
        // result.hasPrevPage = false
        // result.prevPage = null
        // result.pagingCounter = 1
        if (err)
            return res.status(404).json(err);

        return res.status(200).json(result);


    });


}
    catch (error) {
    console.log(error);
    }

}






