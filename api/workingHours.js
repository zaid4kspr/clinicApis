module.exports = function (router) {

    const WorkingHours = require('../models/workingHours');
    const restify = require('express-restify-mongoose')
    restify.serve(router, WorkingHours,{"prefix":"","version":""});

}