const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Chao Xin'));

module.exports = router;
