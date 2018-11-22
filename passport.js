const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("./db/db_users");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

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
      if (err) { 
		  return done(null, false, {message: 'DB error.'}); 
		  }
      if (!user || user.length < 1 ) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
      }else{
		  return done(null, user);
	  }
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

function hashpassword(req, res, next) {
    if (req.user && req.body.password) {
		try{
		  bcrypt.genSalt(saltRounds, function(err_salt, salt){
			  if(err_salt){
				  console.log("Error hashpassword genSalt");
				  console.log(err_salt);
				  res.status.send("Error in hashpassword genSalt").end();
			  }else{
				  bcrypt.hash(req.body.password, salt, function(err, hash){
					  if(err){
						  console.log("Error in hashpassword hash");
						  console.log(err);
						  res.status(500).send("Error in hashpassword hashing").end();
					  }else{
						  req.body.password = hash;
						  next();
					 }
				  })
			}
		  })

	    }catch(err){
			console.log("hashpassword error");
			console.log(err);
		  res.status(500).send(err).end();
	    }  
    }else{    
    next();
	}
 }

module.exports = {
	hashpassword: hashpassword,
    passport: passport,
    ensureAdmin: ensureAdmin
};
