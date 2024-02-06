const userController = require('../controller/user-controller');
const { authenticate } = require('../utils/databaseUtils');
const express = require('express');
const router = express.Router();

router.route("/streak")
    .get(authenticate, userController.getStreak);

router.route("/register")
    .post(userController.createUser);

router.route("/login")
    .post(userController.login);

router.route("/username")
    .post(userController.checkUsername);

module.exports = router;