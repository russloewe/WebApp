var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;
var blogImg = require('../settings.js').blogImg;
const db = require('../db/db_articles.js');
var ensureAdmin = require('../passport.js').ensureAdmin;
//set up admin authorized middlware
const ensureAdminMW = ensureAdmin({redirectTo:'/auth/login?auth=false',
                                   unauthRedirect: '/auth/unauth',
                                   userLevel: 1});
/* GET  page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Blog",
                           style: req.style,
                           footerimage: blogImg,
                           sitename: siteName});
});

router.get('/topic/:topic/titles', function(req, res, next) {
  db.getPageTitles(req,query.topic, function(err, dbres){
      if(err){
          res.status(500).send(err).end();
      }else{
        res.send(dbres).end();
    }
  })
});

router.get('/topic/:topic/id/:id', function(req, res, next) {
    db.getPage(req.query.topic, req.query.id, 'blog', function(err, dbres){
      if(err){
          res.status(500).end();
      }else{
        res.send(dbres).end();
    }
  })
});


router.get('/topic/:topic/cards', function(req, res, next) {
  db.getPageCards(req.query.topic, function(err, dbres){
      if(err){
          res.status(500).end();
      }else{
        res.send(dbres).end();
    }
  })
});


module.exports = router;
