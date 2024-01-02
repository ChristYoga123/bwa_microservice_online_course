const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', userController.register)

module.exports = router;
