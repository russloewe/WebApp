
let chai = require('chai');
let server = require('../app');
let should = chai.should();
var expect = require("chai").expect;
var assert = require('assert');
const db = require('../db/postSQL.js');

describe('Test Postsql', function() {
    describe('getPage()', () => {
		it('Should get page object', (done) => {
			db.getPage(3, (err, dbres) => {
				expect(err).to.be.null;
				expect(dbres).to.not.be.null;
				expect(dbres).to.not.be.empty;
				console.log(dbres);
				expect(dbres).to.be.a('array');
				expect(dbres[0]).to.have.property('title').and.to.be.a('string');
				done()
			});
		}).timeout(1000);
    });
    
	describe('getPageCards()', () => {
		it('Should get page object', (done) => {
			db.getPageCards('test', (err, dbres) => {
				expect(err).to.be.null;
				expect(dbres).to.not.be.null;
				expect(dbres).to.be.a('array');
				expect(dbres).to.not.be.empty;
				done()
			});
		}).timeout(1000);
    });
});

