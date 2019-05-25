var expect = require("chai").expect;
var db = require("../db/db_pages.js");

describe("Test article database internal api", function(){
    describe('.getPages()', function(){
        it("Should get a list of all the articles", function(done) {
            db.getPages("articles", function(err, results) {
                expect(err).to.be.null;
                expect(results).to.not.be.null;
                expect(results).to.be.a('array');
                expect(results[0]).to.have.property('title').and.to.be.a('string');
                expect(results[0]).to.have.property('description').and.to.be.a('string');
                expect(results[0]).to.have.property('body').and.to.be.a('string');
                expect(results[0]).to.have.property('id').and.to.be.a('number');
                done();
            })
        }).timeout(1000);
    });
})
