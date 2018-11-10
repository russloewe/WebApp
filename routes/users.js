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
            res.status(500).send(err).end();
        }else{
            db.findByName(req.body.username, function(err, result){
                if(err){
                    res.status(500).send("Couldnt verify record insertion");
                    res.end();
                }else{
                    res.status(200).json(result).end();
                }
            })
        }
    });
});

router.get('/info:user_id?', function(req, res) {
    
    let user_id;
    try{
        user_id = req.query.user_id;
    }catch{
        res.status(500).json({status: false, message: 'couldnt parse user_id'});
        res.end();
    }
    if((req.user && (req.user.user_id == user_id)) || (req.user.user_type < 2)){
        db.findById(req.user.user_id, function (err, userrecord) {
            if(err){
                res.status(500).end();
            }else{
                res.json(userrecord);
                res.end();
            }
        })
    }else{
        res.status(500).send("user is not authenticted for that querry");
        res.end();
    }
    
});

router.post('/remove', function(req, res){
    if(req.body.user_id){
        const user_id = req.body.user_id;
        if( isNaN(user_id) ){
            res.status(500).send('invalid user_id format').end();
        }else{
            db.removeUserId(user_id, function(err, result){
                if(err){
                    res.status(500).send(err);
                    res.end();
                }else{
                    res.status(200).json({status: true}).end();
                }
            })
        }
    }else if(req.body.username){
        const username = req.body.username;
        if(username.includes(';')){
            res.status(500).send('invalid username format').end();
        }else{
            db.removeUserName(username, function(err, result){
                if(err){
                    res.status(500).json({status: false, message: 'Error removing user'});
                    res.end();
                }else{
                    res.status(200).json({status: true}).end();
                }
            })
        }
    }else{
        res.status(500).send('recieved neither username or id').end();
    }
});


module.exports = router;
