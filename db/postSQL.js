/*
* Author     : Russell Loewe russloewe@gmail.com
* Date       : 5-24-2019
* Filename   : db_pages.js
* project    : WebApp
* site       : https://github.com/russloewe/WebApp
* Description: 
* 
* Collection of functions for retrieving data from a Post SQL
* server.
*/

const userNameQuery = require("./postgresQuery.js").userNameQuery;

const databaseConfig = {
    user: 'web',
    database: 'web',
    password: 'web',
    port: 5432
};

const pg = require('pg');

// Create the database connection
console.log("Connecting to with config: ");
console.log(databaseConfig);
const pool = new pg.Pool(databaseConfig);



function getAll(querry,  cb){
	// Mostly a wrapper to the error handling and connection closing.
	// The SQL querry is prepared elsewhere with prepard statements.
    pool.connect((err, client, donedb) => {
        if(err){
			/* There was an error in connecting to the database
			 *    + Close the connection.
			 *    + Call cb with error. 
			 */
			donedb();
            cb(err, null); 
        }else{
			/* Execute the querry and close the connection.
			 * Call cb with either an error or the results.
			 */
            client.query(querry, function(err, result){ 
                donedb();
                if(err){
                    cb(err, null);
                }else{
                    cb(null, result.rows);
                }
            })
        }
    })
};




function getUserName(name, cb){
	// Curried function for userNameQuerry prepard statement.
	getAll(userNameQuery({userName: name}), cb);
}

function getUserId(id, cb){
    // Find user record by id
    getAll(userIDQuery({userID: id}), cb);
}

module.exports = {
   getUserName: getUserName,
   getUserId: getUserId}   
