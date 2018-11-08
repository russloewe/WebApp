var expect = require("chai").expect;
var db = require("../db/db.js");

describe("Postgres Database", function() {
  describe("Connecting to the database", function() {
    it("Authenticated user connected.", function(done) {
      db.pool.connect((err, client, done) => {
          if(err){ throw err}
          done();
      });
      done();
    }).timeout(1000);
  });

});
