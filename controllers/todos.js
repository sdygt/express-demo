const express = require('express');
const router = express.Router();
const todos = require('../models/todos');

router.get('/', function (req, res) {
  todos.getAll()
    .then(data => {
      res.status(200).json(data).end();
    })
    .catch(err => {
      res.status(500).end(err.message);
    });
});

router.get('/:id', (req, res) => {
  todos.getOne(req.params.id)
    .then(data => {
      if (data) {
        res.status(200).json(data).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      console.warn(err);
      res.status(500).end(err.message);
    });
});

router.post('/', (req, res) => {
  if (!req.body.text) {
    res.status(400).end('Field `text` not set');
    return;
    /* Remember to end the handler itself,
    otherwise Node will continue execute code below,
    although `res` has ended.
     */
  }
  todos.add(req.body.text)
    .then((id) => {
      res.status(201).location(`${req.baseUrl}/${id.toHexString()}`).end();
    })
    .catch(err => {
      console.warn(err);
      res.status(500).end(err.message);
    });
});

router.put('/:id', (req, res) => {
  if (!req.body.text) {
    res.status(400).end('Field `text` not set');
    return;
  }
  todos.update(req.params.id, req.body.text)
    .then(r => {
      if (r.modifiedCount === 1) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      console.warn(err);
      res.status(500).end(err.message);
    });
});

router.delete('/:id', (req, res) => {
  todos.remove(req.params.id)
    .then(r => {
      res.status(204).end();
    })
    .catch(err => {
      console.warn(err);
      res.status(500).end(err.message);
    });
});

module.exports = router;
