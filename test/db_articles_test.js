var expect = require("chai").expect;
var db = require("../db/db_articles.js");

describe("Test article database internal api", function(){
    var test_id;
    before(function(done){
        article = {title: 'test article',
                   author: 'test author',
                   keywords: 'test test',
                   text: 'Article text body'};
        db.addArticle(article, "articles", function(err, result) {
                expect(err).to.be.null;
                db.getLastArticle("articles", function(err2, result2) {
                    expect(err2).to.be.null;
                    expect(result2).to.be.a('number');
                    console.log("Created article id: " + result2);
                    test_id = result2;
                    done();
                })
            });
        });

    describe('.getArticles()', function(){
        it("Should get a list of all the articles", function(done) {
            db.getArticles("articles", function(err, results) {
                expect(err).to.be.null;
                expect(results).to.not.be.null;
                expect(results).to.be.a('array');
                expect(results[0]).to.have.property('title').and.to.be.a('string');
                expect(results[0]).to.have.property('author').and.to.be.a('string');
                expect(results[0]).to.have.property('text').and.to.be.a('string');
                expect(results[0]).to.have.property('keywords').and.to.be.a('string');
                expect(results[0]).to.have.property('article_id').and.to.be.a('number');
                done();
            })
        }).timeout(1000);
    });
    describe('.findArticle()', function () {
        it("Should return test article", function(done) {
            db.findArticle(test_id,"articles",  function(err, result){
                expect(err).to.be.null;
                expect(result).to.not.be.null;
                expect(result).to.have.property('title').and.to.equal('test article');
                expect(result.article_id).to.equal(test_id);
                done();
            })
        }).timeout(1000);
    });
    describe('.updateArticle', function(){
        it('Should update the article keywords', function(done){
            const rand_key = Math.random().toString(36).substring(2, 20);
            const rand_text = Math.random().toString(36).substring(2, 20);
            const rand_title = Math.random().toString(36).substring(2, 20);
            const article = {article_id: test_id, 
                             keywords: rand_key,
                             title: rand_title,
                             text: rand_text}
                             
            db.updateArticle(article,"articles",  function(err,res){
                expect(err).to.be.null;
                db.findArticle(test_id,"articles",  function(err2, res2){
                    expect(err2).to.be.null;
                    expect(res2.keywords).to.equal(rand_key);
                    expect(res2.title).to.equal(rand_title);
                    expect(res2.text).to.equal(rand_text);
                    done();
                });
            });

        }).timeout(1000);
    });
    describe('.sqlAddArticleFormat', function() {
        it("Should get right formatted string", function(done){
            article = {title: 'test article',
                       author: 'test author',
                       keywords: 'test test',
                       description: 'test description',
                       text: 'Article text body'};
            const formatted = db.sqlAddArticleFormat(article, "articles");
            expect(formatted).to.be.a('string');
            expect(formatted).to.equal("INSERT INTO articles (title, author, keywords, text, description, created_on) VALUES('test article','test author','test test','Article text body','test description', CURRENT_TIMESTAMP);");
            done();
        }).timeout(1000);
    });
    describe('.removeArticle()', function() {
        it('Should remove article: '+test_id, function(done) {
            db.removeArticle(test_id, "articles", function(err, res) {
                expect(err).to.be.null;
                db.findArticle(test_id, "articles", function(err2, res2){
                    expect(res2).to.be.null;
                    expect(err2).to.not.be.null;
                    done();
                })
            })
        }).timeout(1000);
    });
})
