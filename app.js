var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var passport = require('./passport').passport;
var ensureAdmin = require('./passport').ensureAdmin;
var session = require('express-session');
const hashpassword = require('./passport').hashpassword;
const compression = require('compression');
const rateLimit = require("express-rate-limit");

//import site settings 
var siteName = require('./settings.js').siteName;

//import routers
const authRouter = require('./routes/auth');
const pagesRouter = require('./routes/pages');
var app = express();
app.use(compression());

//verify node environment
var env = process.env.NODE_ENV || 'dev';
console.log("Node env: " + env);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//set up express-sessions
app.use(session({secret: "cats",
                 resave: false,
                 saveUninitialized: true}));

//set up passport
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
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

//set routers
app.use('/', hashpassword);
app.use('/auth/login', apiLimiter);
app.use('/auth', authRouter);
app.use('/pages', pagesRouter);

//set static file servers
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/private', ensureAdminMW); // require logged in user
app.use('/private', express.static(path.join(__dirname, 'private')));

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
  res.render('error', { title: siteName, root: 'root',
                        style: req.style,
                        footerimage: homeImg,
                        sitename: siteName});
});

module.exports = app;
