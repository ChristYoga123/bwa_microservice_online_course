const express = require('express');
const router = express.Router();
const mediaController = require('../app/controllers/mediaController');

router.post("/", mediaController.store)

module.exports = router;
