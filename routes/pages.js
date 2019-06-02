/* filename:     pages.js
 * author:  russell loewe
 * project: WebApp
 * github: http://github.com/russloewe/WebApp
 * desc:   
 * 	
 * Web API for page data hosted on SQL backend.
 * 	
 * Also renders the HTML page that references the 
 * 		js bundle for the webapp.
 */

var express = require('express');
var router = express.Router();
const db = require('../db/postSQL.js');

/* GET  index  */
router.get('/', function(req, res, next) {
  res.render('index', { title: "WebApp",
                           style: req.style});
});

/* GET a single page by id */
router.get('/page/id/:id', function(req, res, next) {
    db.getPage(req.query.id, function(err, dbres){
      if(err){
          res.status(500).end();
      }else{
        res.send(dbres).end();
    }
  })
});

/* GET an array of page cards (title, desc, thumb, date) */
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
