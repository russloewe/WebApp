/* filename:     auth.js
 * author:  russell loewe
 * project: WebApp
 * github: http://github.com/russloewe/WebApp
 * desc:   
 * 	
 * Web API to authorize users
 * 	
 */
 
const express = require('express');
const router  = express.Router();
const passport = require("passport");
const db = require("../db/postSQL.js");



router.post('/login',
  passport.authenticate('local', { successReturnToOrRedirect: '/',
                                   failureRedirect: '/auth/login?success=false',
                                   failureFlash: false })
);


router.get('/login:auth?:success?', function(req, res) {
    let loginMessage;
    if(req.query.auth == 'false') {
        loginMessage = "Please login to view that page";
    }else if(req.query.success == 'false'){
        loginMessage = "Login Failed!";
    }else{
        loginMessage = "Please login";
    }
    res.render('index', {title: 'Login Screen', message: loginMessage,
                            style: req.style});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/unauth', function(req, res) {
    res.render('error', {title: 'Unauthorized',
						 root: 'login',
                            style: req.style});
});

router.get('/status', function(req, res) {
    if(req.user){
        db.findById(req.user.user_id, function (err, userrecord) {
            if(err){
                res.status(500).end();
            }else{
                const userdata = {loggedIn: true,
                    username: userrecord.username,
                    usertype: userrecord.user_type};
                res.json(userdata);
                res.end();
            }
        })
    }else{
        const userdata = {loggedIn: false};
        res.json(userdata);
        res.end();
    }
    
});


module.exports = router;
