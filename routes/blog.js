var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;
const db = require('../db/db_articles.js');

/* GET blog page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Blog",
                           style: req.style});
});

router.get('/article:id?', function(req, res, next) {
  const article = {title: "How to Code",
                   date: req.query.id,
                   text:"textsaenotuhasne othnet aohneotuh"};
    
  res.send(article).end();
});

router.get('/all', function(req, res, next) {
  db.getAllArticles(function(err, dbres){
      if(err){
          res.status(500).end();
      }else{
        res.send(dbres).end();
    }
  })
});


module.exports = router;
