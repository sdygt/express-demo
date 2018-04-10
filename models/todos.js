const config = require('config');
const MongoClient = require('mongodb').MongoClient;

exports.add = async (text) => {
  let client = await MongoClient.connect(config.get('MONGO_URI'));

  const collection = client.db('demo').collection('todos');
  return new Promise((resolve, reject) => {
    collection.insertOne({'text': text})
      .then(r => resolve(r.insertedId))
      .catch(err => {
        console.warn(err.stack);
        reject(err);
      });
  });
  /*
    await collection.insertOne({'text': text})
      .then((r) => {
        return r.insertedId;
      })
      .catch((err) => {
        console.warn(err.stack);
        throw err;

      });
   */
  // assert.equal(1, result.insertedCount);
};
