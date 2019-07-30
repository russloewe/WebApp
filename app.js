
var express = require('express');
var path = require('path');
const ensureAdmin = require('./passport').ensureAdmin;
const hashpassword = require('./passport').hashpassword;

var app = express();


//set up compression
const compression = require('compression');
app.use(compression());

//verify node environment
var env = process.env.NODE_ENV || 'dev';
console.log("Node env: " + env);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set up logger
const logger = require('morgan');
app.use(logger('dev'));

//set up json 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//set up express-sessions
const session = require('express-session');
app.use(session({secret: "cats",
                 resave: false,
                 saveUninitialized: true}));

//set up passport
const passport = require('./passport').passport;
app.use(passport.initialize());
app.use(passport.session());


//set up admin authorized middlware

const ensureAdminMW = ensureAdmin({redirectTo:'/auth/login?auth=false',
                                   unauthRedirect: '/auth/unauth',
                                   userLevel: 1});
                                   
//add mobile-desktop stylsheet setter
app.use(function(req, res, next) {
    const userAgent = req.headers['user-agent'];
    if(userAgent.includes('Mobi')){ //simple test for mobile device
        req.style = '/stylesheets/mobile.css';
    }else{
        req.style = '/stylesheets/desktop.css';
    }
    next();
});

//set up rate limiter
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

//set up authentication router
const authRouter = require('./routes/auth');
app.use('/auth/login', apiLimiter);
app.use('/auth', authRouter);

// set up index router
const indexRouter = require('./routes/index');
app.use('/', hashpassword);
app.use('/', indexRouter);

//set static file servers
app.use('/', express.static(path.join(__dirname, 'public')));

//set up private file server tree 
app.use('/private', ensureAdmin({redirectTo:'/auth/login?auth=false',
                                   unauthRedirect: '/auth/unauth',
                                   userLevel: 1})); // require logged in user
app.use('/private', express.static(path.join(__dirname, 'private')));

// catch 404 and forward to error handler
var createError = require('http-errors');
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
  res.render('error', { title: "Error Page", root: 'root',
                        style: req.style});
});

module.exports = app;
