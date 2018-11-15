var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;
const db = require('../db/db_projects.js');

/* GET projects page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Projects",
                           style: req.style});
});

router.get('/all', function(req, res, next) {
  db.getAllProjects(function(err, dbres){
      if(err){
          res.status(500).send(err);
      }else{
        res.send(dbres).end();
    }
  })
});
module.exports = router;
