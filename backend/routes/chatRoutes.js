const express = require('express');
const router = express.Router();


router.get('/messages', (req, res) => {
    res.send('List of chat messages will be here');
});

module.exports = router;
