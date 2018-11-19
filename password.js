var db = require("./db/db_users.js");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

bcrypt.genSalt(saltRounds, function(err1, salt){
	bcrypt.hash('pass', salt, function(err2, hash){
		console.log("hash: "+hash);
		console.log("salt: "+salt);
		user={ user_id: 2,
			   password: hash};
	    db.updateUserPassword(user, function(err3, rus){
			if(err3){
				console.log(err3);
			}
		})
	})
})
