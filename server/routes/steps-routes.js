const stepsController = require('../controller/steps-controller');
const { authenticate } = require('../utils/databaseUtils');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(authenticate, stepsController.getSteps)
    .post(authenticate, stepsController.logSteps);

module.exports = router;