const express = require('express');
const router = express.Router();
const mediaController = require('../app/controllers/mediaController');

router.post("/", mediaController.store)
router.get("/", mediaController.index)
router.delete("/:id", mediaController.destroy)

module.exports = router;
