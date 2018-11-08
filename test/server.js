let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = require("chai").expect;
var assert = require('assert');

chai.use(chaiHttp);

describe('Authenticate User', () => {
    it('Login should fail.', (done) => {
        chai.request(server)
        .post('/auth/login')
        .send({username: 'bob', password: 'fakepass'})
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.success).to.equal(false);
            done();
        });
    }).timeout(1000);
    
    it('Login should succeed.', (done) => {
        chai.request(server)
        .post('/auth/login')
        .send({username: 'bob', password: 'password'})
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
    }).timeout(1000);
});


describe('/GET users - no auth', () => {
    it('Should get redirect', (done) => {
        chai.request(server)
        .get('/users/all')
        .end((err, res) => {;
            expect(res.headers['content-type']).to.equal('text/html; charset=utf-8');
            //expect(res).should.contain('/auth/login');
            done();
        });
    }).timeout(1000);
});

describe('/GET users - auth', () => {
    it('Should get all the users', (done) => {
        chai.request(server)
        .get('/users/all')
        .auth('bob', 'password')
        .end((err, res) => {
            res.should.have.status(200);
            should.exist(res.body);
            expect(res.body).to.not.be.empty;
            expect(res.body[0]).to.have.property('user_id');
            done();
        });
    }).timeout(1000);
});

describe('/auth/status ', () => {
    it('should return false', (done) => {
        chai.request(server)
        .get('/auth/status')
        .end((err, res) => {
            res.should.have.status(200);
            console.log('@@@@@@@@@@@@@@@@@@@@@');
            console.log(res.body);
            res.body.should.have.property('loggedIn', false);
            done();
        });
    }).timeout(1000);
});
