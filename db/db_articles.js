const databaseConfig = require('../settings.js').databaseConfig;
const pg = require('pg');
const crypto = require('crypto');
//postgresql client setup
const pool = new pg.Pool(databaseConfig);
console.log("Connecting to Postrges Database with config: ");
console.log(databaseConfig);

/*
    articles(
    title VARCHAR(500) NOT NULL;
    created_on TIMESTAMP NOT NULL,
    text VARCHAR,
    keywords VARCHAR(500),
    author VARCHAR(500),
    article_id serial PRIMARY KEY);
 */
 
function sqlAddArticleFormat(article) {
   const query = 'INSERT INTO articles (title, author, keywords, text, created_on) VALUES';
   const to_str = [article.title, article.author, article.keywords, article.text];
   const to_str_quotes = to_str.map(function(ele){
        return( "'"+ele+"'");
  });
  const two = '('+to_str_quotes+', CURRENT_TIMESTAMP);';
  const final = query + two;
  return final;
}; 

function getAllArticles(cb) {
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            client.query('SELECT * FROM articles', function(err, result){
                done();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result.rows);
                }
            })
        }
    })
}

function findByTitle(title, cb){
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            client.query("SELECT * FROM articles where title = '"+title+"';", function(err, result){
                done();
                if(err){
                    cb(err, null);
                }else{
                    if(result.length < 1){
                        cb(new Error("no articles found"), null);
                    }else{
                        cb(null, result.rows[0]);
                    }
                }
            })
        }
    })
};

function findById(id, cb){
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            client.query("SELECT * FROM articles where article_id = '"+id+"';", function(err, result){
                done();
                if(err){
                    cb(err, null);
                }else{
                    if(result.length < 1){
                        cb(new Error("No articles found"), null);
                    }else{
                        cb(null, result.rows[0]);
                    }
                }
            })
        }
    })
};

function addArticle(user, cb){
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            let query_str;
            try{
                query_str = sqlAddArticleFormat(user);
            }catch(error){
                cb(error, null);
            }
            client.query(query_str, function(err, result) {
                done();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result);
                };
            });
        }
    });
};

function updateArticle(article_id, property, value, cb){
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            const query_str = "UPDATE articles SET "+property+" = '"+value+"' WHERE article_id ="+article_id+";";
            client.query(query_str, function(err, res) {
                done();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, res);
                };
            });
        }
    });
};

function removeArticleId(article_id, cb){
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            const query = 'DELETE FROM articles WHERE article_id = '+article_id+');';
            client.query(query, function(err, result){
                done();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result);
                }
            })
        }
    })
};

function removeArticleTitle(article_title, cb){
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            const query = "DELETE FROM users WHERE username = '"+article_title+"';";
            client.query(query, function(err, result){
                done();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result);
                }
            })
        }
    })
};

module.exports = {
   findByTitle: findByTitle,
   findById: findById,
   getAllArticles: getAllArticles,
   addArticle: addArticle,
   updateArticle: updateArticle,
   removeArticleId: removeArticleId,
   removeArticleTitle: removeArticleTitle,
   pool: pool,
   sqlAddArticleFormat: sqlAddArticleFormat
}
