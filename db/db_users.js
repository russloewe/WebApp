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
   const query = 'INSERT INTO users (username, password, email, user_type, created_on) VALUES';
   const to_str = [user.username, user.password, user.email];
   const to_str_quotes = to_str.map(function(ele){
        return( "'"+ele+"'");
  });
  const two = '('+to_str_quotes+', '+user.user_type+', CURRENT_TIMESTAMP);';
  const final = query + two;
  return final;
}; 

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

function addUser(user, cb){
    pool.connect((err, client, donedb) => {
        if(err){
			donedb();
            cb(err, null);
        }else{
            let query_str;
            try{
                query_str = sqlAddUserFormat(user);
            }catch(error){
				donedb();
                cb(error, null);
            }
            client.query(query_str, function(err, result) {
                donedb();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result);
                };
            });
        }
    });
};

function updateUserInfo(user, cb){
    pool.connect((err, client, donedb) => {
        if(err){
            donedb();
            cb(err, null);
        }else{
			if(!user.username){
				donedb();
				cb(new Error("No username provided"), null)
			}else if(!user.email){
				donedb();
				cb(new Error("No email provided"), null);
			}else{
				//eventually change this to only update provided values
				const intro = "UPDATE users SET ";
				const name = "username = '" + user.username+"'";
				const email = "email = '" + user.email+"'";
				const end = " WHERE user_id ="+user.user_id+";";
				const query_str = intro + name + ", " + email  + end;
				client.query(query_str, function(err, res) {
					donedb();
					if(err){
						cb(err, null);
					}else{
						cb(null, res);
					};
				});
			}
        }
    });
};

function updateUserType(user, cb){
    pool.connect((err, client, donedb) => {
        if(err){
            donedb();
            cb(err, null);
        }else{
			if(!user.user_type){
				donedb();
				cb(new Error("No user_type"), null);
			}else{
            //eventually change this to only update provided values
				const intro = "UPDATE users SET ";
				const user_type =  "user_type = '" + user.user_type+"'";
				const end = " WHERE user_id ="+user.user_id+";";
				const query_str = intro + user_type + end;
				client.query(query_str, function(err, res) {
					donedb();
					if(err){
						cb(err, null);
					}else{
						cb(null, res);
					};
				});
            }
        }
    });
};

function updateUserPassword(user, cb){
    pool.connect((err, client, donedb) => {
        if(err){
            donedb();
            cb(err, null);
        }else{
			if(!user.password){
				donedb();
				cb(new Error("No password provided"), null);
			}else{
				//eventually change this to only update provided values
				const intro = "UPDATE users SET ";
				const pass =  "password = '" + user.password+"'";
				const end = " WHERE user_id ="+user.user_id+";";
				const query_str = intro + pass + end;
				client.query(query_str, function(err, res) {
					donedb();
					if(err){
						cb(err, null);
					}else{
						cb(null, res);
					};
				});
			}
        }
    });
};



function removeUserId(userid, cb){
    pool.connect((err, client, donedb) => {
        if(err){
            cb(err, null);
            donedb();
        }else{
            const query = 'DELETE FROM users WHERE user_id = '+userid+';';
            client.query(query, function(err, result){
                donedb();
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
    pool.connect((err, client, donedb) => {
        if(err){
            cb(err, null);
            donedb();
        }else{
            const query = "DELETE FROM users WHERE username = '"+username+"';";
            client.query(query, function(err, result){
                donedb();
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
   updateUserInfo: updateUserInfo,
   updateUserPassword: updateUserPassword,
   updateUserType: updateUserType,
   removeUserId: removeUserId,
   removeUserName: removeUserName,
   pool: pool,
   sqlAddUserFormat: sqlAddUserFormat
}
