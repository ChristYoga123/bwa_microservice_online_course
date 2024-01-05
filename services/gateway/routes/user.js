require('dotenv').config();
const express = require('express');
const router = express.Router();
const userHandler = require('./handler/userHandler');
const verifyToken = require('../middlewares/verifyToken');

router.post('/auth/register', userHandler.register);
router.post('/auth/login', userHandler.login);
router.post('/auth/refresh-tokens', userHandler.refreshToken);
router.put('/:id/profile', verifyToken, userHandler.updateProfile);

module.exports = router;