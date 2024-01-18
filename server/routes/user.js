const mysql = require('mysql2/promise');
const config = require('../config');

const express = require('express');
const router = express.Router();


router.post('/', async (request, response) => {
    let {username, email, password} = request.body;

    let sql = `INSERT INTO users(username, email, password)
        values (?, ?, ?)`;
    let inserts = [username, email, password];

    const connection = await mysql.createConnection(config.db);
    let [result, ] = await connection.query(sql, inserts);

    response.json(result);
});


module.exports = router;