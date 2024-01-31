const preferencesController = require('../controller/preferences-controller');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(preferencesController.getPreferences)
    .post(preferencesController.createPreferences)
    .patch(preferencesController.changePreferences);

module.exports = router;