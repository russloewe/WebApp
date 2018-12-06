
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = require("chai").expect;
var assert = require('assert');
const bcrypt = require('bcryptjs');

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

    describe('/blog - Authenticated', () => {
		let test_blog_id;
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
            
            after(function(done_after) {
                agent.post('/blog/remove')
                .send({article_id: test_blog_id})
                .end((err1, res1) => {
                    expect(err1).to.be.null;
                    expect(res1.status).to.equal(200);
					agent.close();
					done_after();                    
                })
            });
            describe("/blog/add", function(){
				it('Should add test article', (done) => {
					var rand_title =  Math.random().toString(36).substring(2, 20);
					const article = {title: rand_title,
								  text: 'testpassword'};
					agent
					.post('/blog/add')
					.send(article)
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res.status).to.equal(200);
						agent
						.get('/blog/all')
						.end((err2, res2) =>{
							expect(err2).to.be.null;
							expect(res2.body).to.be.a('array').and.to.not.be.empty;
							expect(res2.body[0]).to.have.property('title').and.to.equal(rand_title);
							expect(res2.body[0].article_id).to.be.a('number');
							test_blog_id = res2.body[0].article_id;
							expect(test_blog_id).to.be.a('number');
							console.log("Created test article with id: "+ test_blog_id);
							done();
						})
					})
				}).timeout(1000);
			})
			describe("/blog/all", function(){
				it('Should get all blog articles.', (done) => {
				   agent
				   .get('/blog/all')
				   .end((err, res) => {
					   expect(res.status).to.equal(200);
					   done();
				   });
				}).timeout(1000);
			})
			describe("/blog/edit", function(){
				it('Should change test_article title and text.', (done) => {
					var rand_title =  Math.random().toString(36).substring(2, 20);
					var rand_text =  Math.random().toString(36).substring(2, 20);
					var rand_text2 =  Math.random().toString(36).substring(2, 20);
					var user2 = {title: rand_title,
								 keywords: rand_text2,
								article_id: test_blog_id, 
								text: rand_text};
				   agent
				   .post('/blog/edit')
				   .send(user2)
				   .end((err, res) => {
					   expect(err).to.be.null;
					   expect(res.body).to.be.empty;
					   expect(res.status).to.equal(200);
					   agent
					   .get('/blog/article?id='+test_blog_id)
					   .end((err2, res2) => {
						   expect(err2).to.be.null;
						   expect(res2.status).to.equal(200);
						   expect(res2.body).to.have.property('article_id').and.to.equal(test_blog_id);
						   expect(res2.body).to.have.property('text').and.to.equal(rand_text);
						   expect(res2.body).to.have.property('title').and.to.equal(rand_title);
						   expect(res2.body).to.have.property('keywords').and.to.equal(rand_text2);
						   done();
					   })
				   });
				}).timeout(1000);
			})
        })
    });
})


