const config = require('config');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

module.exports = {

  add: async (text) => {
    const client = await MongoClient.connect(config.get('MONGO_URI'));

    const collection = client.db('demo').collection('todos');
    return new Promise((resolve, reject) => {
      collection.insertOne({'text': text})
        .then(r => resolve(r.insertedId))
        .catch(err => {
          console.warn(err.stack);
          reject(err);
        });
    });
  },

  getOne: async (id) => {
    let client = await MongoClient.connect(config.get('MONGO_URI'));

    const collection = client.db('demo').collection('todos');
    return new Promise((resolve, reject) => {
      collection.findOne({'_id': new ObjectID(id)}, {}, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  },

  getAll: async () => {
    let client = await MongoClient.connect(config.get('MONGO_URI'));
    const collection = client.db('demo').collection('todos');
    return new Promise((resolve, reject) => {
      collection.find({}, {}).toArray((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
    });
  },

  update: async (id, text) => {
    let client = await MongoClient.connect(config.get('MONGO_URI'));
    const collection = client.db('demo').collection('todos');
    return new Promise((resolve, reject) => {
      collection.updateOne(
        {'_id': new ObjectID(id)},
        {$set: {'text': text}},
        (err, r) => {
          console.warn(r);
          err ? reject(err) : resolve(r);
        });
    });
  },

  remove: async (id) => {
    let client = await MongoClient.connect(config.get('MONGO_URI'));
    const collection = client.db('demo').collection('todos');
    return new Promise((resolve, reject) => {
      collection.deleteOne({'_id': new ObjectID(id)}, (err, r) => {
        err ? reject(err) : resolve(r);
      });
    });
  }
};
