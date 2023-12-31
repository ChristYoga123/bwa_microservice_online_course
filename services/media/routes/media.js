const express = require('express');
const router = express.Router();
const MediaController = require("../controllers/MediaController");

router.get('/', MediaController.index);
router.post("/", MediaController.store)
router.delete("/:id", MediaController.destroy)

module.exports = router;
