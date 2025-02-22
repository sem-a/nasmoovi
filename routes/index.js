const express = require('express');
const { index } = require('../controllers');
const router = express.Router();

// /api
router.get('/', index);

module.exports = router;
