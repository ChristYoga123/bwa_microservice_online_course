require('dotenv').config();
const express = require('express');
const router = express.Router();
const mediaHandler = require('./handler/mediaHandler');

router.post('/', mediaHandler.store);
router.get('/', mediaHandler.all);
router.delete('/:id', mediaHandler.destroy);

module.exports = router;