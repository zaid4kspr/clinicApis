var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./api/index');
var app = express();
const restify = require('express-restify-mongoose')
const passport = require('passport');

var os = require("os");
var hostname = os.hostname();

//added by Z
const swaggerUi = require("swagger-ui-express");
require('dotenv').config()
const mongoose = require('mongoose')

var helmet = require('helmet');
app.use(helmet());
app.disable('x-powered-by');





//initializes the passport configuration.
const allowUrl = ['/api/users/doctors', '/api/workinghours', 'home'];


const authenticationMiddleware = (whiteList = []) => (req, res, next) => {

  next()
  // if(whiteList.find(req.originalUrl)) {
  //   next();
  // }else{
  //   passport.authenticate('jwt', function (err, user, info) {
  //     if (!user) {
  //       return res.status(401)
  //     } else {
  //       next()
  //     }
  //     if (user) {
  //       console.log(user);
  //     }
  //   })(req, res, next);

  // }



}

app.use(passport.initialize());
app.use(authenticationMiddleware(allowUrl));



//imports our configuration file which holds our verification callbacks and things like the secret for signing.

require('./config/passport-config')(passport);

const expressSwagger = require('express-swagger-generator')(app);

// var env = process.env.NODE_ENV || 'development';
var env = 1
let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: env == 1 ? "localhost:3000" : "doctorappointmentstn.herokuapp.com",
    basePath: '/',
    produces: [
      "application/json"

    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      Bearer: {
        description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    security: [{ Bearer: [] }],
    defaultSecurity: 'Bearer'
  },
  basedir: __dirname, //app absolute path
  files: ['./api/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(options));


//mongoDb connexion
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_CONNEXION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB')
})
app.use('/uploads', express.static('uploads'));


//CORS bypass
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization,Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Expose-Headers', 'x-total-count');
  next();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//updated by z
app.use('/api', indexRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
