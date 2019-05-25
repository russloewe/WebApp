const databaseConfig = require('../settings.js').databaseConfig;
const pg = require('pg');
//postgresql client setup
const pool = new pg.Pool(databaseConfig);
console.log("Connecting to Postrges Database with config: ");
console.log(databaseConfig);

function getAllUsers(cb) {
    pool.connect((err, client, donedb) => {
        if(err){
			donedb();
            cb(err, null);
        }else{
            client.query('SELECT * FROM users ORDER BY user_id;', function(err, result){
                donedb();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result.rows);
                }
            })
        }
    })
}

function findByName(username, cb){
    pool.connect((err, client, donedb) => {
        if(err){
			donedb();
            cb(err, null);
        }else{
            client.query("SELECT * FROM users where username = '"+username+"';", function(err, result){
                donedb();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result.rows[0]);
                }
            })
        }
    })
};

function findById(userid, cb){
    pool.connect((err, client, donedb) => {
        if(err){
			donedb();
            cb(err, null);
        }else{
            client.query("SELECT * FROM users where user_id = '"+userid+"';", function(err, result){
                donedb();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result.rows[0]);
                }
            })
        }
    })
};



module.exports = {
   findByName: findByName,
   findById: findById,
   getAllUsers: getAllUsers,
   pool: pool,
   sqlAddUserFormat: sqlAddUserFormat
}
