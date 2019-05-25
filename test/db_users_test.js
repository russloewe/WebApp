//Test the database API for users

var expect = require("chai").expect;
var db = require("../db/db_users.js");

describe("Test user database internal api", function(){
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

}) 
