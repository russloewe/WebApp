var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;
var homeImg = require('../settings.js').homeImg;
const db = require('../db/db_home.js');
var ensureAdmin = require('../passport.js').ensureAdmin;
//set up admin authorized middlware
const ensureAdminMW = ensureAdmin({redirectTo:'/auth/login?auth=false',
                                   unauthRedirect: '/auth/unauth',
                                   userLevel: 1});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: siteName, root: 'root',
                        style: req.style,
                        footerimage: homeImg,
                        sitename: siteName});
});
router.get('/home', function(req, res, next) {
    db.getHome(function(err, dbres){
      if(err){
          res.status(500).end();
      }else{
        res.send(dbres).end();
    }
  })
});

router.post('/edit', ensureAdminMW, function(req, res) {
    if( !req.body ){
        res.status(500).send('No body').end();
	}else if(!req.body.text){
		res.status(500).send('No text').end();
	}else{
        db.updateHome(req.body, (err, success) => {
            if(err){
                console.log(err);
                res.status(500).end();
            }else{
                res.status(200).end();
            }
        });
    }
});
module.exports = router;
