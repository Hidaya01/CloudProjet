const express = require('express');
const router = express.Router();

const tasks = [
  { id: 1, name: 'Task 1', status: 'TO DO' },
  { id: 2, name: 'Task 2', status: 'IN PROGRESS' },
];

router.get('/', (req, res) => {
  res.json(tasks);
});

module.exports = router;
