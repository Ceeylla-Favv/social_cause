const express = require('express');
const contributeToCause = require('../controller/contributionController');

const router = express.Router();

router.post('/:id', contributeToCause);

module.exports = router;