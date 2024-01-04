require('dotenv').config();
const express = require('express');
const router = express.Router();
const userHandler = require('./handler/userHandler');

router.post('/auth/register', userHandler.register);

module.exports = router;