var express = require('express');
var router = express.Router();
const passport = require("passport");
var db = require("../db/db_users.js");



router.get('/all', function(req, res) {
    db.getAllUsers(function(err, result) {
        if(err){
			console.log(err);
            res.status(500).send(err).end();
        }else{
            res.status(200).send(result);
        }
    })
});

router.post('/add', function(req, res) {
    db.addUser(req.body, (err, success) => {
        if(err){
			console.log("error adding user");
			console.log(err);
            res.status(500).end();
        }else{
			db.findByName(req.body.username, function(err2, res2){
				if(err2){
					res.status(500).send("Couldn't verify user insertion").end();
				}else{
					res.status(200).send({user_id: res2.user_id,
						                  username: req.body.username}).end();
				}
			})
        }
    });
});

router.post('/edit/info', function(req, res) {
    if(!req.body){
        res.status(500).send('No request body').end();
    }else if(!req.body.user_id){
        res.status(500).send('No user_id').end();
    }else if(!req.body.username){
        res.status(500).send('No username').end();    
    }else if(!req.body.email){
        res.status(500).send('No email').end();
    }else{
        db.updateUserInfo(req.body, (err, success) => {
            if(err){
                console.log(err);
                res.status(500).end();
            }else{
                res.status(200).end();
            }
        });
    }
});
router.post('/edit/password', function(req, res) {
    if(!req.body){
        res.status(500).send('No request body').end();
    }else if(!req.body.user_id){
        res.status(500).send('No user_id').end();
    }else if(!req.body.password){
        res.status(500).send('No password').end();
    }else{
        db.updateUserPassword(req.body, (err, success) => {
            if(err){
                console.log(err);
                res.status(500).end();
            }else{
                res.status(200).end();
            }
        });
    }
});
router.post('/edit/type', function(req, res) {
    if(!req.body){
        res.status(500).send('No request body').end();
    }else if(!req.body.user_id){
        res.status(500).send('No user_id').end();
    }else if(!req.body.user_type){
        res.status(500).send('No user_type').end();
    }else{
        db.updateUserType(req.body, (err, success) => {
            if(err){
                console.log(err);
                res.status(500).end();
            }else{
                res.status(200).end();
            }
        });
    }
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
        db.findById(user_id, function (err, userrecord) {
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
