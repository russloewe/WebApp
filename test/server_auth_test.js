
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = require("chai").expect;
var assert = require('assert');

chai.use(chaiHttp);
describe('Test /auth', function() {
    describe('/auth/login', function() {
        it('Login should fail.', (done) => {
            chai.request(server)
            .post('/auth/login')
            .send({username: 'bob', password: 'fakepass'})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.exist;
                console.log(res.body);
                expect(res.status).to.equal(200);                
                expect(res.redirects).to.exist.and.to.be.a('array');
                expect(res.redirects[0]).to.exist;
                expect(res.redirects[0]).to.have.string('/auth/login?success=false');
                done();
            });
        }).timeout(1000);
        
        it('Login should succeed.', (done) => {
            chai.request(server)
            .post('/auth/login')
            .send({username: 'bob', password: 'pass'})
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.redirects).to.exist.and.to.be.a('array');
                expect(res.redirects[0]).to.exist;
                expect(res.redirects[0]).to.not.have.string('/auth/login?success=false');
                done();
            });
        }).timeout(1000);
    });

})
