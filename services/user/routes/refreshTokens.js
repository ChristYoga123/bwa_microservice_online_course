const express = require('express');
const router = express.Router();
const refreshTokenController = require("../controllers/RefreshTokenController")

/* GET users listing. */
router.post('/', refreshTokenController.storeToken)
router.get('/', refreshTokenController.getToken)

module.exports = router;
