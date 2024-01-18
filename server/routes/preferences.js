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

router.patch('/', async (request, response) => {
    let {preference, value, userId} = request.body;

    let sql = `UPDATE preferences
        SET ${preference} = ?
        WHERE user_id = ?;`;
    let inserts = [value, userId];

    const connection = await mysql.createConnection(config.db);
    let [result, _fields] = await connection.query(sql, inserts);

    response.json(result);
});

router.post('/', async (request, response) => {
    let {avatar, userId, tooltips} = request.body;

    let sql = `INSERT INTO preferences(avatar, user_id, tooltips)
        VALUES (?, ?, ?)`;
    let inserts = [avatar, userId, tooltips];

    const connection = await mysql.createConnection(config.db);
    let [result, _fields] = await connection.query(sql, inserts);

    response.json(result);
})

module.exports = router;