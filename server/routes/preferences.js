const mysql = require('mysql2/promise');
const config = require('../config');

const express = require('express');
const router = express.Router();

router.get('/:userId', async (request, response) => {

    let sql = `SELECT * FROM preferences
        WHERE user_id = ?;`;
    let inserts = [ request.params.userId ];

    const connection = await mysql.createConnection(config.db);
    let [result, _fields] = await connection.query(sql, inserts);

    response.json(result);
});

router.put('/', async (request, response) => {
    let {preference, value, userId} = request.body;

    let sql = `UPDATE preferences
        SET ${preference} = ?
        WHERE user_id = ?;`;
    let inserts = [value, userId];

    const connection = await mysql.createConnection(config.db);
    let [result, _fields] = await connection.query(sql, inserts);

    response.json(result);
});

module.exports = router;