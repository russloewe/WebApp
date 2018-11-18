const databaseConfig = require('../settings.js').databaseConfig;
const pg = require('pg');
const crypto = require('crypto');
//postgresql client setup
const pool = new pg.Pool(databaseConfig);
console.log("Connecting to Postrges Database with config: ");
console.log(databaseConfig);

/*
 * user table:
 * user_id: primary key, automatic
 * username: VARCHAR(50) UNIQUE NOT NULL
 * password: VARCHAR(50) NOT NULL
 * passsalt: VARCHAR(20) NOT NULL
 * email:    VARCHAR(355)UNIQUE NOT NULL
 * user_type: INT NOT NULL
 * created_on: TIMESTAMP NOT NULL
 * last_login: TIMESTAMP
 */
 
function sqlAddUserFormat(user) {
   const query = 'INSERT INTO users (username, password, passsalt, email, user_type, created_on) VALUES';
   const to_str = [user.username, user.password, user.passsalt, user.email];
   const to_str_quotes = to_str.map(function(ele){
        return( "'"+ele+"'");
  });
  const two = '('+to_str_quotes+', '+user.user_type+', CURRENT_TIMESTAMP);';
  const final = query + two;
  return final;
}; 

function getAllUsers(cb) {
    pool.connect((err, client, done) => {
        if(err){
            cb(err, null);
        }else{
            client.query('SELECT * FROM users ORDER BY user_id;', function(err, result){
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

function addUser(user, cb){
    pool.connect((err, client, done) => {
        if(err){
            cb(err, null);
        }else{
            let query_str;
            try{
                query_str = sqlAddUserFormat(user);
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

function updateUser(user_id, property, value, cb){
    pool.connect((err, client, done) => {
        if(err){
            cb(err, null);
        }else{
            const query_str = "UPDATE users SET "+property+" = '"+value+"' WHERE user_id ="+user_id+";";
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

function removeUserId(userid, cb){
    pool.connect((err, client, done) => {
        if(err){
            cb(err, null);
            done();
        }else{
            const query = 'DELETE FROM users WHERE user_id = '+userid+';';
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

function removeUserName(username, cb){
    pool.connect((err, client, done) => {
        if(err){
            cb(err, null);
            done();
        }else{
            const query = "DELETE FROM users WHERE username = '"+username+"';";
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
   findByName: findByName,
   findById: findById,
   getAllUsers: getAllUsers,
   addUser: addUser,
   updateUser: updateUser,
   removeUserId: removeUserId,
   removeUserName: removeUserName,
   pool: pool,
   sqlAddUserFormat: sqlAddUserFormat
}
