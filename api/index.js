
//added by z
var express = require('express');
var router = express.Router();



require('./user')(router);
require('./doctorSpecialty')(router);
require('./rdv')(router);
require('./workingHours')(router);
require('./doctorStats')(router);
require('./chambre')(router);





module.exports = router;