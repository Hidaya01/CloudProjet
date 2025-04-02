const express = require('express');
const router = express.Router();

const projects = [
  { id: 1, name: 'Project A' },
  { id: 2, name: 'Project B' },
];

router.get('/', (req, res) => {
  res.json(projects);
});

module.exports = router;
