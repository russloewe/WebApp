
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = require("chai").expect;
var assert = require('assert');
const bcrypt = require('bcryptjs');

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

    describe('/users - Authenticated', () => {
		let test_user_id;
        var agent;
        describe('Authenticated as Admin', function() {
            
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

        })
    });
})

