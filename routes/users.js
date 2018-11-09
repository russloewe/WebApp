var express = require('express');
var router = express.Router();
var pool = require("../db/db.js").pool;
var db = require("../db/db.js");
var fs = require('fs');

/* GET users listing using local json file */
router.get('/json', function(req, res, next) {
  var obj;
  fs.readFile('./db/db.json', 'utf8', function(err, data){
      if(err){
          res.status(500).send();
          console.log(err);
      }else{
          obj = JSON.parse(data);
          res.json(obj.users);
          res.end();
      }
  })
});

router.get('/all', function(req, res) {
    db.getAllUsers(function(err, result) {
        if(err){
            res.status(500).end();
        }else{
            res.status(200).send(result);
        }
    })
});

router.post('/add', function(req, res) {
    db.addUser(req.body, (err, success) => {
        if(err){
            res.status(500).end();
        }else{
            res.status(200).end();
        }
    });
});

module.exports = router;
