/*// Importing third-party packages
let createError = require('http-errors'); // Package for creating HTTP errors
let express = require('express'); // Express.js framework for building web applications
let path = require('path'); // Node.js module for working with file paths
let cookieParser = require('cookie-parser'); // Middleware for parsing cookies
let logger = require('morgan'); // Logging middleware for HTTP requests
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
//let passportLocalMongoose = require('passport-local-mongoose');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let app = express();

//create a user model
let userModel = require('../models/user');
let User = userModel.user;

// Configuring MongoDB
let mongoose = require('mongoose'); // MongoDB ODM (Object-Document Mapper)
let DB = require('./db'); // Custom module for MongoDB URI

// Pointing mongoose to the MongoDB URI
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
    console.log('Connected to MongoDB');
});
//initialize flash
app.use(flash());

passport.use(User.createStrategy());

//serialize and deserialize the user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//set-up express session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}))

// Importing route modules
let indexRouter = require('../routes/index'); // Routes for the root path (localhost:3000)
let usersRouter = require('../routes/users'); // Routes for user-related paths (localhost:3000/users)
let courseRouter = require('../routes/course'); // Routes for course-related paths (localhost:3000/course-list)

// Creating an Express application
//let app = express();

// Setting up the view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev')); // Logging HTTP requests in development mode
app.use(express.json()); // Parsing JSON requests
app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded requests
app.use(cookieParser()); // Parsing cookies
app.use(express.static(path.join(__dirname, '../../public'))); // Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../../node_modules'))); // Serving static files from the 'node_modules' directory
app.use('/public', express.static(path.join(__dirname, 'public')));


// Routes setup
app.use('/', indexRouter); // Handling requests to the root path (localhost:3000)
app.use('/users', usersRouter); // Handling requests to user-related paths (localhost:3000/users)
app.use('/course-list', courseRouter); // Handling requests to course-related paths (localhost:3000/course-list)

// Catching 404 errors and forwarding to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, providing error information in development mode
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: "Error"
  });
});

// Exporting the configured Express application
module.exports = app;*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
var router = express.Router();

let app = express();
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// create a user model instance
let userModel = require('../models/user');
let User = userModel.User;
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

let mongoose = require('mongoose');
let mongoDB = mongoose.connection;
let DB = require('./db');
//mongoose.connect('mongodb://127.0.0.1:27017/BookLib');
mongoose.connect(DB.URI);
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{console.log("Mongo DB is connected")});
//mongoose.connect(DB.URI);
// Set-up Express-Session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));
// initialize flash-connect
app.use(flash());
// implement a user authentication
passport.use(User.createStrategy());
// Serialize and Deserialize user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
// initialize the passport
app.use(passport.initialize());
app.use(passport.session());
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let CoursesRouter = require('../routes/course');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/course-list', CoursesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});

module.exports = app;

