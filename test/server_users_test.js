
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = require("chai").expect;
var assert = require('assert');

chai.use(chaiHttp);
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
        describe('Authenticated as Admin', function() {
            let test_user_id;
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
                agent.post('/users/remove')
                .send({username: 'testuser_server1'})
                .end((err1, res1) => {
                    expect(err1).to.be.null;
                    agent.post('/users/remove')
                    .send({username: 'testuser_server2'})
                    .end((err2, res2) => {
                        agent.close();
                        done_after();
                    })
                    
                })
            });
            it('Should add test user1', (done) => {
                const user = {username: 'testuser_server1',
                              password: 'testpassword',
                              passsalt: 'testsalt',
                              email:    'testemail_server1',
                              user_type: 3};
                agent
                .post('/users/add')
                .send(user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.be.empty;
                    expect(res.body).to.have.property('username').and.to.equal('testuser_server1');
                    expect(res.body).to.have.property('user_id').and.to.be.a('number');
                    test_user_id = res.body.user_id;
                    done();
                })
            }).timeout(1000);
            it('Should add test user2', (done) => {
                const user = {username: 'testuser_server2',
                              password: 'testpassword',
                              passsalt: 'testsalt',
                              email:    'testemail_server2',
                              user_type: 3};
                agent
                .post('/users/add')
                .send(user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.be.empty;
                    expect(res.body).to.have.property('username').and.to.equal('testuser_server2');
                    expect(res.body).to.have.property('user_id').and.to.be.a('number');
                    done();
                })
            }).timeout(1000);
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
             it('Should change bobs email address', (done) => {
                var rand_email =  Math.random().toString(36).substring(2, 20);
                var user = {username: 'bob',
                            password: 'pass',
                            user_id: 2, 
                            email: rand_email,
                            user_type: 1};
               agent
               .post('/users/edit')
               .send(user)
               .end((err, res) => {
                   expect(res.status).to.equal(200);
                   done();
               });
            }).timeout(1000);
            
            it('Should get user bob', (done) => {
                agent
                .get('/users/info?user_id=2')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.have.property('username').and.to.equal('bob');
                    done();
                })
            }).timeout(1000);
            
            
            
            it('Should remove test user by name', (done) => {
                agent
                .post('/users/remove')
                .send({username: 'testuser_server2'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.have.property('status').and.to.equal(true);
                    done();
                })
            }).timeout(1000);
            
            it('Should remove test user by id', (done) => {
                agent
                .post('/users/remove')
                .send({user_id: test_user_id})
                .end((err, res) => {
                    console.log(res.body);
                    expect(err).to.be.null;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.have.property('status').and.to.equal(true);
                    done();
                })
            }).timeout(1000);
        })
    });
})

describe('Test /blog', function() {
    describe('/blog/all', function() {
        it('Should get articles', (done) => {
            chai.request(server)
            .get('/blog/all')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.a('array').and.to.not.be.empty;
                done();
            });
        }).timeout(1000);
    })
})
