const express = require('express');
const router = express.Router();

let todolist = {1: 'todo1'};

router.get('/', function (req, res, next) {
  res.status(200).json(todolist);
});

router.get('/:id', (req, res, next) => {
  if (!todolist[req.params.id]) {
    res.status(404).end();
  } else {
    res.status(200).end(todolist[req.params.id]);
  }
});

router.post('/', (req, res, next) => {
  let id = Object.keys(todolist).length + 1;
  todolist[id] = req.body.content;
  res.status(201).location(req.baseUrl + '/' + id).end();
});

router.put('/:id', (req, res, next) => {
  if (!todolist[req.params.id]) {
    res.status(404).end();
  } else {
    todolist[req.params.id] = req.body.content;
    res.status(200).end();
  }
});

router.delete('/:id', (req, res, next) => {
  delete todolist[req.params.id];
  res.status(204).end();

});

module.exports = router;
