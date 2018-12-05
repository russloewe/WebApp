var express = require('express');
var router = express.Router();
var siteName = require('../settings.js').siteName;
const db = require('../db/db_articles.js');

/* GET blog page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Blog",
                           style: req.style});
});

router.get('/article:id?', function(req, res, next) {
    db.findArticle(req.query.id, 'blog', function(err, dbres){
      if(err){
          res.status(500).send(err).end();
      }else{
        res.send(dbres).end();
    }
  })
});


router.get('/all', function(req, res, next) {
  db.getArticles('blog', function(err, dbres){
      if(err){
          res.status(500).send(err).end();
      }else{
        res.send(dbres).end();
    }
  })
});

router.post('/edit', function(req, res) {
    if( !req.body ){
        res.status(500).send('No body').end();
    }else if(!req.body.article_id ){
		res.status(500).send('No article_id').end();
	}else if(!req.body.title){
		res.status(500).send('No article title ').end();
	}else if(!req.body.text){
		res.status(500).send('No text').end();
	}else{
        db.updateArticle(req.body, 'blog', (err, success) => {
            if(err){
                console.log(err);
                res.status(500).send(err).end();
            }else{
                res.status(200).end();
            }
        });
    }
});

router.post('/add', function(req, res) {
    if( !(req.body || req.body.title) ){
        res.status.send('No title or request body').end();
    }else{
        db.addArticle(req.body, 'blog', (err, success) => {
            if(err){
                console.log(err);
                res.status(500).send(err).end();
            }else{
                res.status(200).end();
            }
        });
    }
});

router.post('/remove', function(req, res){
    if(req.body.article_id){
        const article_id = req.body.article_id;
        if( isNaN(article_id) ){
            res.status(500).send('invalid article_id format').end();
        }else{
            db.removeArticle(article_id, 'blog', function(err, result){
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
