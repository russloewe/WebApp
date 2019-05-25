/*
* Author     : Russell Loewe russloewe@gmail.com
* Date       : 5-24-2019
* Filename   : db_pages.js
* Description: Collection of functions for retrieving data from a Post SQL
* 	server.
*/

const databaseConfig = require('../settings.js'); // DB server info + credent.
const pg = require('pg');
const prep = require('pg-prepared');
const pool = new pg.Pool(databaseConfig);

console.log("Connecting to with config: ");
console.log(databaseConfig);

// Prepare the SQL query statement
const pageQuery = prep('SELECT * FROM pages WHERE (id = ${id} AND topic = ${topic}) ORDER BY created_on DESC;');
const pageCardQuery = prep('SELECT id, title, description, img FROM pages WHERE (topic = ${topic}) ORDER BY created_on DESC;');
const userNameQuery = prep("SELECT * FROM users where username = '${name}';"


function getAll(username, cb){
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
                    cb(null, result.rows);
                }
            })
        }
    })
};

module.exports = {
   pageQuery: pageQuery,
   pageCardQuery: pageCardQuery,
   getAll: getAll}   
