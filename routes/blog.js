var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;

/* GET blog page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Blog",
                           style: req.style});
});

router.get('/article:id?', function(req, res, next) {
  const article = {title: "How to Code",
                   date: req.query.id,
                   text:"textsaenotuhasne othnet aohneotuh"};
    
  res.render('article', article);
});

module.exports = router;
