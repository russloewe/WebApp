var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;

/* GET profile page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Admin Dashboard",
                           style: req.style});
});

module.exports = router;
