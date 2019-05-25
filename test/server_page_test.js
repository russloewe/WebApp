
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = require("chai").expect;
var assert = require('assert');


chai.use(chaiHttp);

describe('Test /blog ', function() {
    describe('/GET /blog/all', () => {
        describe('Not authenticated', function() {
            it('Should get all articles', (done) => {
                chai.request(server)
                .get('/blog/all')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('array');
                    done();
                });
            }).timeout(1000);
        })
    });
})


