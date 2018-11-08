const databaseConfig = require('../settings.js').databaseConfig;
const pg = require('pg');
const crypto = require('crypto');
//postgresql client setup
const pool = new pg.Pool(databaseConfig);
console.log("Connecting to Postrges Database with config: ");
console.log(databaseConfig);

function getAllUsers(cb) {
    pool.connect((err, client, done) => {
        if(err){
            cb(err, null);
        }else{
            client.query('SELECT * FROM users', function(err, result){
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

function findByName(username, cb){
    pool.connect((err, client, done) => {
        if(err){
            cb(err, null);
        }else{
            client.query("SELECT * FROM users where username = '"+username+"';", function(err, result){
                done();
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
    pool.connect((err, client, done) => {
        if(err){
            cb(err, null);
        }else{
            client.query("SELECT * FROM users where user_id = '"+userid+"';", function(err, result){
                done();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result.rows[0]);
                }
            })
        }
    })
};

function addUser(customer, cb){
    const username = customer.username;
    const password = customer.password;
    const email = customer.email;
    const salt = crypto.randomBytes(20);
    console.log('user:'+username);
    console.log('pass:'+password);
    console.log('email:'+email);
    console.log('salt:'+salt);
    cb(null, null);
};

module.exports = {
   findByName: findByName,
   findById: findById,
   getAllUsers: getAllUsers,
   addUser: addUser,
   pool: pool
}
