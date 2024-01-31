const stepsController = require('../controller/steps-controller');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(stepsController.getSteps)
    .post(stepsController.logSteps);

module.exports = router;