//Test the database API for users

var expect = require("chai").expect;
var db = require("../db/db_users.js");

describe("Test user database internal api", function(){
	var test_id;
    describe('.addUser()', function() {
        it('Should insert user record to database', function(done) {
            var user = {username: 'testuser5',
                    password: 'testpassword',
                    passsalt: 'testsalt',
                    email:    'testemail5',
                    user_type: 3};
            db.addUser(user, function(err, result) {
                expect(err).to.be.null;
                db.findByName('testuser5', function(err2, res) {
                    expect(err2).to.be.null;
                    expect(res.username).to.exist;
                    expect(res.username).to.be.a('string').and.to.equal('testuser5');
                    test_id = res.user_id;
                    console.log("Created test user with id: "+test_id);
                    done();
                })
            });
        }).timeout(1000);
    });
    describe('.getAllUsers()', function(){
        it("Should get a list of all the users", function(done) {
            db.getAllUsers(function(err, results) {
                expect(err).to.be.null;
                expect(results).to.not.be.null;
                expect(results).to.be.a('array');
                expect(results[0]).to.have.property('username').and.to.be.a('string');
                expect(results[0]).to.have.property('password').and.to.be.a('string');
                expect(results[0]).to.have.property('email').and.to.be.a('string');
                expect(results[0]).to.have.property('user_id').and.to.be.a('number');
                done();
            })
        })
    });
    describe('.findByName()', function () {
        it("Should return bob's record", function(done) {
            db.findByName("bob", function(err, result){
                expect(err).to.be.null;
                expect(result).to.have.property('username');
                expect(result.user_id).to.equal(2);
                done();
            })
        })
    });
    describe('.findById()', function () {
        it("Should return bob's record", function(done) {
            db.findById(2, function(err, result){
                expect(err).to.be.null;
                expect(result).to.have.property('username').and.to.equal('bob');
                expect(result.user_id).to.equal(2);
                done();
            })
        }).timeout(1000);
    });
    describe('.updateUserInfo', function(){
        it('Should update the user email and username', function(done){
			var rand_email =  Math.random().toString(36).substring(2, 20);
			var rand_name =  Math.random().toString(36).substring(2, 20);
			var user = {username: rand_name,
						user_id: test_id, 
						email: rand_email};
			db.updateUserInfo(user, function(err2,res2){
				expect(err2).to.be.null;
				db.findById(test_id, function(err3, res3){
					expect(err3).to.be.null;
					expect(res3.email).to.equal(rand_email);
					expect(res3.username).to.equal(rand_name);
					done();
				});
			});
        }).timeout(1000);
        it('Should update the user password', function(done){
            db.findByName('testuser5', function(err, res) {
                expect(err).to.be.null;
                var rand_pass =  Math.random().toString(36).substring(2, 20);
                var user = {password: rand_pass,
                            user_id: test_id};
                db.updateUserPassword(user, function(err2,res2){
                    expect(err2).to.be.null;
                    db.findById(test_id, function(err3, res3){
                        expect(err3).to.be.null;
                        expect(res3.password).to.equal(rand_pass);
                        done();
                    });
                });
            });
        }).timeout(1000);
        it('Should update the user type', function(done){
			var rand_num =  Math.floor(Math.random() * 10);            
			var user2 = {user_type: rand_num,
						user_id: test_id};
			db.updateUserType(user2, function(err2,res2){
				expect(err2).to.be.null;
				db.findById(test_id, function(err3, res3){
					expect(err3).to.be.null;
					expect(res3.user_type).to.equal(rand_num);
					done();
				});
			});
        }).timeout(1000);
    });
    describe('.sqlAddUserFormat', function() {
        it("Should get right formatted string", function(done){
            const user = {username: 'testuser',
                          password: 'testpassword',
                          email:    'testemail',
                          user_type: 3};
            const formatted = db.sqlAddUserFormat(user);
            expect(formatted).to.be.a('string');
            expect(formatted).to.equal("INSERT INTO users (username, password, email, user_type, created_on) VALUES('testuser','testpassword','testemail', 3, CURRENT_TIMESTAMP);");
            done();
        });
    });
    describe('.removeUserName()', function() {
        it('Should remove user using username', function(done) {
            db.removeUserId(test_id, function(err, res) {
                expect(err).to.be.null;
                done();
            })
        }).timeout(1000);
    });
}) 
