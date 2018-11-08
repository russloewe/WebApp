var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;

/* GET profile page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('reactapp', { title: siteName,
                           style: req.style});
});

module.exports = router;
