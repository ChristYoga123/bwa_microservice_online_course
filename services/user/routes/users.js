const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController")

/* GET users listing. */
router.get('/', userController.getAllUser)
router.get("/:id", userController.getUserById)
router.post('/auth/register', userController.register)
router.post('/auth/login', userController.login)
router.put('/:id/profile', userController.updateProfile)
router.delete('/auth/logout', userController.logout)

module.exports = router;
