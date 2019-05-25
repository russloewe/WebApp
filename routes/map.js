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
  res.render('map', { title: siteName, root: 'map',
                        style: req.style,
                        footerimage: homeImg,
                        sitename: siteName,
                        map: '/maps/simple.js'});
});
router.get('/map:id?', function(req, res, next) {
  res.render('map', { title: "Map",
                           style: req.style,
                           footerimage: homeImg,
                           sitename: siteName,
                           map: '/maps/'+req.query.id+'.js'});
});
module.exports = router;
