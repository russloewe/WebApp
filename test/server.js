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
                res.should.have.status(200);
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
    describe('/auth/status ', () => {
        describe("Not logged in", function() {
            it('should return false', (done) => {
                chai.request(server)
                .get('/auth/status')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('loggedIn', false);
                    done();
                });
            }).timeout(1000);
        })
    });
})

describe('Test /users ', function() {
    describe('/GET /users/all', () => {
        describe('Not authenticated', function() {
            it('Should get redirect', (done) => {
                chai.request(server)
                .get('/users/all')
                .end((err, res) => {
                    expect(res.headers['content-type']).to.equal('text/html; charset=utf-8');
                    done();
                });
            }).timeout(1000);
        })
    });

    describe('/GET /users/all', () => {
        describe('Authenticated', function() {
            var agent;
            before(function(done_before) {
                agent = chai.request.agent(server);
                agent
                .post('/auth/login')
                .send({username: 'bob', password: 'pass'})
                .then((res, req) => {
                    expect(res.status).to.equal(200);
                    done_before();
                })
            });
            
            after(function(done_after) {
                agent.close().then(
                done_after())
            });
            
            it('Should get all the users', (done) => {
               agent
               .get('/users/all')
               .end((err, res) => {
                   expect(res.body).to.not.be.empty;
                   expect(res.body).to.be.a('array');
                   expect(res.body[0]).to.have.property('user_id').and.to.be.a('number');
                   done();
               });
            }).timeout(1000);
        })
    });
})
