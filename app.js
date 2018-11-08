var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./db/db");
var passport = require('./passport').passport;
var ensureAdmin = require('./passport').ensureAdmin;
var session = require('express-session');

//import routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');
const projectsRouter = require('./routes/projects');
const profileRouter = require('./routes/profile');
const adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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
app.use(function(req, res, next) {
    const userAgent = req.headers['user-agent'];
    if(userAgent.includes('Mobi')){ //simple test for mobile device
        req.style = '/stylesheets/style_mobile.css';
    }else{
        req.style = '/stylesheets/style.css';
    }
    next();
});

//set routers
app.use('/',  indexRouter);
app.use('/auth', authRouter);
app.use('/blog', blogRouter);
app.use('/projects', projectsRouter);
app.use('/profile', profileRouter);
app.use('/users', ensureAdminMW, usersRouter);
app.use('/admin', ensureAdminMW, adminRouter);

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
  res.render('error');
});

module.exports = app;
