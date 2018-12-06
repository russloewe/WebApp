const databaseConfig = require('../settings.js').databaseConfig;
const pg = require('pg');
const crypto = require('crypto');
//postgresql client setup
const pool = new pg.Pool(databaseConfig);
console.log("Connecting to Postrges Database with config: ");
console.log(databaseConfig);

/*
    home(
    text VARCHAR);
 */
 

function getHome(cb) {
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            client.query('SELECT * FROM home LIMIT 1;', function(err, result){
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

function updateHome(article, cb){
	if(!article.text){
		cb(new Error("No article text"), null);
	}
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            const intro = "UPDATE home SET ";
            const text =  "text = '" + article.text+"'";
            const end = " WHERE article_id = 1;";
            const query_str = intro + text ;
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


module.exports = {
   updateHome: updateHome,
   getHome: getHome
}
