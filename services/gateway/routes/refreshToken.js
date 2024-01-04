require('dotenv').config();
const express = require('express');
const router = express.Router();
const refreshTokenHandler = require('./handler/refreshTokenHandler');

router.post('/', refreshTokenHandler.refreshToken);

module.exports = router;