/* filename:     pages.js
 * author:  russell loewe
 * project: WebApp
 * github: http://github.com/russloewe/WebApp
 * desc:   
 * 	
 * Web API for page data hosted on SQL backend.
 */

var express = require('express');
var router = express.Router();
const db = require('../db/postSQL.js');


/* GET a single page by id */
router.get('/id/:id', function(req, res, next) {
    db.getPage(req.params.id, function(err, dbres){
      if(err){
          res.status(500).send(err).end();
      }else{
        res.send(dbres).end();
    }
  })
});

/* GET an array of page cards (title, desc, thumb, date) */
router.get('/topic/:topic', function(req, res, next) {
  db.getPageCards(req.params.topic, function(err, dbres){
      if(err){
          res.status(500).send(err).end();
      }else{
        res.send(dbres).end();
    }
  })
});

module.exports = router;
