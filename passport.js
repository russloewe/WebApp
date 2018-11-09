const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("./db/db");

passport.serializeUser(function(user, done) {
    done(null, user.user_id);
});
passport.deserializeUser(function(id, done) {
    db.findById(id, function(err, user) {
        user_info = {user_id: user.user_id,
                     username: user.username,
                     user_type: user.user_type,
                     email: user.email}
        done(err, user_info);
    });
});
        
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.findByName(username, function(err, user) {
      if (err) { return done(err); }
      if (!user || user.length < 1 ) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
       return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

function ensureAdmin(options) {
  if (typeof options == 'string') {
    options = { redirectTo: options.redirectTo,
                unauthRedirect: unauthRedirect,
                userLevel: options.userLevel}
  }
  options = options || {};
  
  var url = options.redirectTo
  var unauthUrl = options.unauthRedirect;
  var setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;
  
  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (setReturnTo && req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect(url);
    }
    if ((req.user.user_type > 1)) {
      if (setReturnTo && req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect(unauthUrl);
    }
    next();
  }
}


module.exports = {
    passport: passport,
    ensureAdmin: ensureAdmin
};
