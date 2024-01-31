const preferencesController = require('../controller/preferences-controller');
const express = require('express');
const router = express.Router();

router.route('/')
    .post(preferencesController.createPreferences)
    .patch(preferencesController.changePreferences);


router.route('/:userId')
    .get(preferencesController.getPreferences);

// router.patch('/', async (request, response) => {
//     let {preference, value, userId} = request.body;

//     let sql = `UPDATE preferences
//         SET ${preference} = ?
//         WHERE user_id = ?;`;
//     let inserts = [value, userId];

//     const connection = await mysql.createConnection(config.db);
//     let [result, _fields] = await connection.query(sql, inserts);

//     response.json(result);
// });

module.exports = router;