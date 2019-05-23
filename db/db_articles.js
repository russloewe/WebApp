const databaseConfig = require('../settings.js').databaseConfig;
const pg = require('pg');
const crypto = require('crypto');
//postgresql client setup
const pool = new pg.Pool(databaseConfig);
console.log("Connecting to Postrges Database with config: ");
console.log(databaseConfig);


function getPage(topic, cb) {
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            client.query('SELECT * FROM pages ORDER BY created_on DESC;', function(err, result){
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

function getPageTitles(table, cb) {
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            client.query('SELECT title, article_id FROM '+table+' ORDER BY created_on DESC;', function(err, result){
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


function getPage(id, table, cb){
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            client.query("SELECT * FROM "+table+" where article_id = '"+id+"';", function(err, result){
                done();
                if(err){
                    cb(err, null);
                }else{
                    if((result.length < 1) || (result.rows[0] == undefined)){
                        cb(new Error("No articles found"), null);
                    }else{
                        cb(null, result.rows[0]);
                    }
                }
            })
        }
    })
};

function addArticle(user, table, cb){
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            let query_str;
            try{
                query_str = sqlAddArticleFormat(user, table);
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

function updateArticle(article, table, cb){
	if(!article.title){
		cb(new Error("no article title"), null);
	}else if(!article.keywords){
		cb(new Error("No keywords"), null);
	}else if(!article.text){
		cb(new Error("No article text"), null);
	}
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            const intro = "UPDATE "+table+" SET ";
            const title = "title = '" + article.title+"'";
            const keywords = "keywords = '" + article.keywords+"'";
            const text =  "text = '" + article.text+"'";
            const description = "description='" + article.description+"'";
            const thumb_img = "thumb_img='" + article.thumb_img+"'";
            const end = " WHERE article_id ="+article.article_id+";";
            const query_str = intro + title + ", " + keywords + ", " + text + "," + description +"," + thumb_img  + end;
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

function removeArticle(article_id, table, cb){
	if(isNaN(article_id)){
		cb(new Error("article_id is not a number"), null);
	}
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            const query = 'DELETE FROM '+table+' WHERE article_id = '+article_id+';';
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
   findArticle: findArticle,
   getArticles: getArticles,
   getLastArticle: getLastArticle,
   addArticle: addArticle,
   updateArticle: updateArticle,
   removeArticle: removeArticle,
   getArticlesTitles: getArticlesTitles,
   sqlAddArticleFormat: sqlAddArticleFormat
}
