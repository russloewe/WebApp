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
  const article = {title: "How to Code",
                   date: req.query.id,
                   text:"textsaenotuhasne othnet aohneotuh"};
    
  res.send(article).end();
});

router.get('/all', function(req, res, next) {
  db.getAllArticles(function(err, dbres){
      if(err){
          res.status(500).end();
      }else{
        res.send(dbres).end();
    }
  })
});

router.post('/edit', function(req, res) {
    console.log(req.body);
    if( !(req.body || req.body.article_id) ){
        res.status.send('No article_id or request body').end();
    }else{
        for(property in req.body){
            if(property && (property != 'article_id')){
                db.updateArticle(req.body.article_id, property, req.body[property], (err, success) => {
                    if(err){
                        console.log(err);
                        //res.status(500).send(err).end();
                    }else{
                    }
                });
            }
        }
        //need to use async waiting
        db.findById(req.body.article_id, function (err, articleRecord) {
            if(err){
                //res.status(500).end();
                console.log(err);
            }else{
                res.json(articleRecord);
                res.end();
            }
        })
    }
});

router.post('/remove', function(req, res){
    if(req.body.article_id){
        const article_id = req.body.article_id;
        if( isNaN(article_id) ){
            res.status(500).send('invalid article_id format').end();
        }else{
            db.removeArticleId(article_id, function(err, result){
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
