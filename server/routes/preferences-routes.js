const preferencesController = require('../controller/preferences-controller');
const { authenticate } = require('../utils/databaseUtils');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(authenticate, preferencesController.getPreferences)
    .post(authenticate, preferencesController.createPreferences)
    .patch(authenticate, preferencesController.changePreferences);

module.exports = router;