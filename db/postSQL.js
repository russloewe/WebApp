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

const databaseConfig = require('../settings.js').databaseConfig; // DB server info + credent.
const pg = require('pg');
const prep = require('pg-prepared');

// Create the database connection
console.log("Connecting to with config: ");
console.log(databaseConfig);
const pool = new pg.Pool(databaseConfig);

// Prepare the SQL query statement
const pageQuery = prep('SELECT * FROM pages WHERE (id = ${pageId}) ORDER BY created_on DESC;');
const pageCardQuery = prep('SELECT id, title, description, img FROM pages WHERE (topic = ${pageTopic}) ORDER BY created_on DESC;');
const userNameQuery = prep("SELECT * FROM users where name = '${userName}';");


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


function getPage(id, cb){
	// Curried function for pageQuery prepared statement.
	return getAll(pageQuery({pageId: id}), cb);
}

function getPageCards(topic, cb){
	// Curried function for pageCardQuerry prepard statement.
	return getAll(pageCardQuery({pageTopic: topic}), cb);
}

function getUserName(name, cb){
	// Curried function for userNameQuerry prepard statement.
	return getAll(userNameQuery({userName: name}), cb);
}

module.exports = {
   getPage: getPage,
   getPageCards: getPageCards,
   getUserName: getUserName}   
