require('dotenv').config();
const express = require('express');
const router = express.Router();
const userHandler = require('./handler/userHandler');

router.post('/auth/register', userHandler.register);
router.post('/auth/login', userHandler.login);

module.exports = router;