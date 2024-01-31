const mysql = require('mysql2/promise');
const config = require('../config');

const express = require('express');
const router = express.Router();


        // results.insertId
        // results.affectedRows
        // results.changedRows


router.get('/:userId', async (request, response) => {
    let days = request.query.days || 7;
    let { userId } = request.params;

    let sql = `SELECT
            DATE_FORMAT(entry_logged, '%e/%c/%Y') AS logged_date,
            SUM(steps) AS total_steps
        FROM steps 
        WHERE (user_id = ?) AND (entry_logged > DATE_SUB(now(), INTERVAL ? DAY))
        GROUP BY logged_date;`

    let inserts = [userId, days - 1 ];

    const connection = await mysql.createConnection(config.db);

    let [result, ] = await connection.query(sql, inserts);

    response.json(result);
});

router.post('/', async (request, response) => {
    let { steps, minsWalked, userId } = request.body;

    const connection = await mysql.createConnection(config.db);

    let sql = `INSERT INTO steps(steps, mins_walked, user_id) 
        VALUES
        (?, ?, ?)`;
    let inserts = [steps, minsWalked, userId];

    let result = connection.query(sql, inserts);
    
    response.json(result);
});

module.exports = router;