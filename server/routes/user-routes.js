const userController = require('../controller/user-controller');
const express = require('express');
const router = express.Router();

router.route("/register")
    .post(userController.createUser);

router.route("/login")
    .post(userController.login);

module.exports = router;