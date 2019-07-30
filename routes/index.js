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
  res.render('home', {  pageTitle: "RussLoewe Profile",
                        pageStyle: req.style,
                        homeActiveStatus: 'active',
                        contactActiveStatus: '',
                     }
            );
});

/* GET  index  */
router.get('/index', function(req, res, next) {
  res.render('home', {  pageTitle: "RussLoewe Profile",
                        pageStyle: req.style,
                        homeActiveStatus: 'active',
                        contactActiveStatus: '',
                     }
            );
});

/* GET  contact  */
router.get('/contact', function(req, res, next) {
  res.render('contact', {  pageTitle: "RussLoewe Contact",
                        pageStyle: req.style,
                        homeActiveStatus: '',
                        contactActiveStatus: 'active',
                     }
            );
});
module.exports = router;
