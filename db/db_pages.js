const databaseConfig = require('../settings.js').databaseConfig;
const pg = require('pg');
const prep = require('pg-prepared');
//postgresql client setup
const pool = new pg.Pool(databaseConfig);
console.log("Connecting to Postrges Database with config: ");
console.log(databaseConfig);

var pageQuery = prep('SELECT * FROM pages WHERE (id == ${id} AND topic == ${topic}) ORDER BY created_on DESC;');
var pageCardQuery = prep('SELECT id, title, description, img FROM pages WHERE (topic == ${topic}) ORDER BY created_on DESC;');

function getPage(topic, id, cb) {
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
			
            client.query(pageQuery({id: id, topic: topic}), function(err, result){
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

function getPageCards(topic, cb){
    pool.connect((err, client, done) => {
        if(err){
            done();
            cb(err, null);
        }else{
            client.query(pageCardQuery({topic: topic}), function(err, result){
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


module.exports = {
   getPage: getPage,
   getPageCards: getPageCards};
}
