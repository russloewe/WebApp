var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;

/* GET projects page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('reactapp', { title: "Projects",
                           style: req.style});
});

module.exports = router;
