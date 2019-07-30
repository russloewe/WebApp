// Prepare the SQL query statement

const prep = require('pg-prepared');

const userNameQuery = prep("SELECT * FROM users where name = '${userName}';");
const userIDQuery = prep("SELECT * FROM users where id = '${userID}';");

module.exports = {
    userNameQuery: userNameQuery
}
