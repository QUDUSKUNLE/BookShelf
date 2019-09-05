const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../../index.js');
const mock = require('../__mockData__');

dotenv.config();
chai.should();
const { expect } = chai;
chai.use(chaiHttp);


// Test for appController
describe('Assessment Test', () => {
  // Test sign up route
  describe('Connect to db', () => {
    before((done) => {
      mongoose.createConnection(
        process.env.MONGODB_URL_TEST,
        { useNewUrlParser: true }
      );
      done();
    });
    it('Should return home when access it', (done) => {
      chai.request(app)
        .get('/api')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          res.body.should.have.property('home').equals('Bookshelf API');
          done();
        });
    });
    it('should be able to signup a new user', (done) => {
      chai.request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send(mock.signUp)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').equals('New user created successfully');
          done();
        });
    });

    it('should be able to get all users', (done) => {
      chai.request(app)
        .get('/api/users')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          done();
        });
    });

    it('should be able to query a user', (done) => {
      chai.request(app)
        .get(`/api/users?email=${mock.signIn.email}`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          assert.equal(mock.signIn.email, res.body.users.email)
          done();
        });
    });

    it('should be able to add a new book', (done) => {
      chai.request(app)
        .post('/api/books')
        .set('Content-Type', 'application/json')
        .send(mock.book)
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(true, res.body.success);
          done();
        });
    });

    it('should be able to query for a book', (done) => {
      chai.request(app)
        .get(`/api/books?isbn=${mock.isbn}`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal('Fetch book successful', res.body.message);
          assert.equal(mock.isbn, res.body.book.isbn);
          done();
        });
    });

    it('should be able to fetch all books', (done) => {
      chai.request(app)
        .get('/api/books')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          done();
        });
    });

    it('should be able to log in a registered user', (done) => {
      chai.request(app)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send(mock.signIn)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          done();
        });
    });

    it('should be able to log in a registered user', (done) => {
      chai.request(app)
        .post('/api/login')
        .set('Content-Type', 'application/json')
        .send(mock.signIn)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(true, res.body.success);
          done();
        });
    });
  });
});
