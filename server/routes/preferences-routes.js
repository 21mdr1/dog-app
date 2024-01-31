const preferencesController = require('../controller/preferences-controller');
const express = require('express');
const router = express.Router();

router.route('/')
    .post(preferencesController.createPreferences)
    .patch(preferencesController.changePreferences);

router.route('/:userId')
    .get(preferencesController.getPreferences);

module.exports = router;