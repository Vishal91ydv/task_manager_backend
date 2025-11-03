const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Task Manager API — running' });
});

module.exports = router;
