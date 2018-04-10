import chai from 'chai';

const request = require('supertest');
const app = require('../../app.js');

let should = chai.should();

describe('GET /todos', () => {
  it('Should 200 with json', (done) => {
    request(app)
      .get('/todos')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.body.should.contains({1: 'todo1'});
        done();
      });
  });
});

describe('GET /todos/:id', () => {
  it('Should 200 with exist ID', (done) => {
    request(app)
      .get('/todos/1')
      .set('Accept', 'text/plain')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.text.should.equal('todo1');
        done();
      });
  });

  it('Should 404 with non-exist ID', (done) => {
    request(app)
      .get('/todos/23333333333333')
      .set('Accept', 'text/plain')
      .expect(404, done);
  });
});

describe('POST /todos', () => {
  let loc = '';
  it('Should add a todo', (done) => {
    request(app)
      .post('/todos')
      .field('text', 'test_content')
      .expect(201)
      .end((err, res) => {
        should.not.exist(err);
        res.header.should.have.property('location');
        loc = res.header.location;
        done();
      });
    request(app)
      .get(loc)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        res.text.should.equal('test_content');
        done();
      });
  });
});
