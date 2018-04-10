const express = require('express');
const router = express.Router();
const todos = require('../models/todos');
let todolist = {1: 'todo1'};

router.get('/', function (req, res) {
  res.status(200).json(todolist);
});

router.get('/:id', (req, res) => {
  if (!todolist[req.params.id]) {
    res.status(404).end();
  } else {
    res.status(200).end(todolist[req.params.id]);
  }
});

router.post('/', (req, res) => {
  if (!req.body.text) {
    res.status(400).end('Header `text` not set');
  }
  todos.add(req.body.text)
    .then((id) => {
      res.status(201).location(`${req.baseUrl}/${id.toHexString()}`).end();
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).end(err.message);
    });
});

router.put('/:id', (req, res) => {
  if (!todolist[req.params.id]) {
    res.status(404).end();
  } else {
    todolist[req.params.id] = req.body.content;
    res.status(200).end();
  }
});

router.delete('/:id', (req, res) => {
  delete todolist[req.params.id];
  res.status(204).end();
});

module.exports = router;
