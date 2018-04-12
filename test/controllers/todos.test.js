import chai from 'chai';

const request = require('supertest');
const app = require('../../app.js');

let should = chai.should();
let expect = chai.expect;

describe('CURD one todo', () => {
  let loc = '';
  it('should add a todo', done => {
    request(app)
      .post('/todos')
      .type('form')
      .send({text: 'test_content'})
      .expect(201)
      .end((err, res) => {
        should.not.exist(err);
        res.header.should.have.property('location');
        loc = res.header.location;
        done();
      });
  });

  it('should readback correctly', done => {
    request(app)
      .get(loc)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        expect(res.body).to.include({text: 'test_content'});
        done();
      });
  });

  it('should 400 if `text` field not set', done => {
    request(app)
      .post('/todos')
      .type('form')
      .expect(400)
      .end(done);
  });

  it('should 404 with non-exist ID', (done) => {
    request(app)
      .get('/todos/aaaabbbbccccddddeeeeffff')
      .set('Accept', 'text/plain')
      .expect(404)
      .end(done);
  });

  it('should update a existing todo', done => {
    request(app)
      .put(loc)
      .type('form')
      .send({'text': 'altered_text'})
      .expect(200)
      .end(done);
  });

  it('should update correctly', done => {
    request(app)
      .get(loc)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        expect(res.body).to.include({text: 'altered_text'});
        done();
      });
  });

  it('should 404 when updating a non-exist todo', done => {
    request(app)
      .put('/todos/aaaabbbbccccddddeeeeffff')
      .type('form')
      .send({'text': 'Should never appear'})
      .expect(404)
      .end(done);
  });

  it('should delete a todo', done => {
    request(app)
      .delete(loc)
      .expect(204)
      .end(done);
  });
});

describe('GET /todos', () => {
  it('Should 200 with json', (done) => {
    request(app)
      .get('/todos')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        done();
      });
  });
});
