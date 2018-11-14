var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;

/* GET projects page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Projects",
                           style: req.style});
});

module.exports = router;
