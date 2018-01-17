import chai from 'chai';

const request = require('supertest');
const app = require('../app.js');

let should = chai.should();

describe('GET /', function () {
  it('Should responds 200', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.text.should.contain('Welcome to Express');
        done();
      });
  });

  it('Should responds 404 on invalid request', function (done) {
    request(app)
      .get('/fooooooooooooo')
      .expect(404, done);
  });
});
