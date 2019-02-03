var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;
var projectImg = require('../settings.js').projectImg;
const db = require('../db/db_articles.js');
var ensureAdmin = require('../passport.js').ensureAdmin;
//set up admin authorized middlware
const ensureAdminMW = ensureAdmin({redirectTo:'/auth/login?auth=false',
                                   unauthRedirect: '/auth/unauth',
                                   userLevel: 1});
/* GET blog page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Projects",
                           style: req.style,
                           footerimage: projectImg,
                           sitename: siteName});
});

router.get('/post/*', function(req, res, next) {
  res.render('index', { title: "Projects",
                           style: req.style,
                           footerimage: projectImg,
                           sitename: siteName});
});


router.get('/article:id?', function(req, res, next) {
    db.findArticle(req.query.id, 'projects', function(err, dbres){
      if(err){
          res.status(500).send(err).end();
      }else{
        res.send(dbres).end();
    }
  })
});


router.get('/all', function(req, res, next) {
  db.getArticles('projects', function(err, dbres){
      if(err){
          res.status(500).send(err).end();
      }else{
        res.send(dbres).end();
    }
  })
});

router.get('/all/titles', function(req, res, next) {
  db.getArticlesTitles('projects', function(err, dbres){
      if(err){
          res.status(500).send(err).end();
      }else{
        res.send(dbres).end();
    }
  })
});

router.post('/edit', ensureAdminMW, function(req, res) {
    if( !req.body ){
        res.status(500).send('No body').end();
    }else if(!req.body.article_id ){
		res.status(500).send('No article_id').end();
    }else if(!req.body.description){
		res.status(500).send('No article description ').end();
	}else if(!req.body.title){
		res.status(500).send('No article title ').end();
	}else if(!req.body.text){
		res.status(500).send('No text').end();
	}else{
        db.updateArticle(req.body, 'projects', (err, success) => {
            if(err){
                console.log(err);
                res.status(500).send(err).end();
            }else{
                res.status(200).end();
            }
        });
    }
});

router.post('/add', ensureAdminMW, function(req, res) {
    if( !(req.body || req.body.title) ){
        res.status.send('No title or request body').end();
    }else{
        db.addArticle(req.body, 'projects', (err, success) => {
            if(err){
                console.log(err);
                res.status(500).send(err).end();
            }else{
                res.status(200).end();
            }
        });
    }
});

router.post('/remove', ensureAdminMW, function(req, res){
    if(req.body.article_id){
        const article_id = req.body.article_id;
        if( isNaN(article_id) ){
            res.status(500).send('invalid article_id format').end();
        }else{
            db.removeArticle(article_id, 'projects', function(err, result){
                if(err){
                    console.log(err);
                    res.status(500).send(err);
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
