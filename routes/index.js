/* filename:     index.js
 * author:  russell loewe
 * project: WebApp
 * github: http://github.com/russloewe/WebApp
 * desc:   
 * 	
 * Render the the index.html
 */

var express = require('express');
var router = express.Router();

/* GET  index  */
router.get('/', function(req, res, next) {
  res.render('index', { title: "WebApp",
                           style: req.style});
});

module.exports = router;
