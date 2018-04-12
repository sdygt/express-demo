const express = require('express');
const config = require('config');
const app = express();

app.use((req, res, next) => {
  console.info('demo-midware called');
  console.info('CONFIG foo=' + config.get('foo'));
  next();
});

module.exports = app;
