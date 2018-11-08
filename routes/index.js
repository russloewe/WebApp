var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: siteName, root: 'root',
                        style: req.style});
});

module.exports = router;
