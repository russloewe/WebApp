
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
var expect = require("chai").expect;
var assert = require('assert');


chai.use(chaiHttp);
describe('Test /pages ', function() {
    describe('/GET /pages/id/3', () => {
		it('Should get page object', (done) => {
			chai.request(server)
			.get('/pages/id/3')
			.end((err, results) => {
				expect(err).to.be.null;
                expect(results).to.not.be.null;
                expect(results.body).to.not.be.null;
                expect(results.body).to.be.a('array');
                expect(results.body).to.not.be.empty;
                expect(results.body[0]).to.have.property('title').and.to.be.a('string');
                expect(results.body[0]).to.have.property('body').and.to.be.a('string');
                expect(results.body[0]).to.have.property('id').and.to.be.a('number');
				done();
			});
		}).timeout(1000);
    });
    
	describe('/GET /pages/topic/test', () => {
		it('Should get page cards', (done) => {
			chai.request(server)
			.get('/pages/topic/test')
			.end((err, results) => {
				expect(err).to.be.null;
                expect(results).to.not.be.null;
                expect(results.body).to.not.be.null;
                expect(results.body).to.be.a('array');
                expect(results.body).to.not.be.empty;
                expect(results.body[0]).to.have.property('title').and.to.be.a('string');
                expect(results.body[0]).to.have.property('id').and.to.be.a('number');
				done();
			});
		}).timeout(1000);
    });
    
	describe('/GET /pages/all/topics', () => {
		it('Should get page cards', (done) => {
			chai.request(server)
			.get('/pages/all/topics')
			.end((err, results) => {
				expect(err).to.be.null;
                expect(results).to.not.be.null;
                expect(results.body).to.not.be.null;
                expect(results.body).to.be.a('array');
                expect(results.body).to.not.be.empty;
                expect(results.body[0]).to.have.property('title').and.to.be.a('string');
                expect(results.body[0]).to.have.property('id').and.to.be.a('number');
				done();
			});
		}).timeout(1000);
    });
})

