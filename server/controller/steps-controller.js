const mysql = require('mysql2/promise');
const config = require('../config');
const { checkResetStreak, checkIncreaseStreak } = require('../utils/streakManagementUtils');

const getSteps = async (request, response) => {
    let days = request.query.days || 7;
    let userId = request.user_id;

    try {
        let startTimestamp = new Date(Date.now() - (days - 1) * (1000 * 3600 * 24));

        let startDate = startTimestamp.toISOString().split('T')[0] + ' 00:00';

        let sql = `
            SELECT
                DATE_FORMAT(entry_logged, '%e/%c/%Y') AS formatted_date,
                AVG(UNIX_TIMESTAMP(entry_logged)*1000) AS date,
                SUM(steps) AS steps
            FROM steps 
            WHERE (user_id = ?) AND (entry_logged >= ? + INTERVAL 0 SECOND)
            GROUP BY formatted_date;
        `;

        let params = [userId, startDate];

        const connection = await mysql.createConnection(config.db);
        let [result, ] = await connection.query(sql, params);

        if (days === 1) {
            checkResetStreak(result[0].steps, userId);
        }

        console.log(result);

        response.json(result);
    } catch (error) {
        response.status(500).json({
            message: `Unable to get steps for user with ID ${userId}: ${error}`
        });
    }
}

const logSteps = async (request, response) => {
    let { steps, minsWalked } = request.body;
    let userId = request.user_id;

    if (!steps || !minsWalked) {
        return response.status(400).json({
            message: "Please provide a number of steps, and a number of minutes walked in the request"
        });
    }

    try {
        checkIncreaseStreak();
        const connection = await mysql.createConnection(config.db);
        let sql = `
            INSERT INTO steps
                SET ?;
        `;
        let params = { steps: steps, mins_walked: minsWalked, user_id: userId };

        let [{insertId}, ] = await connection.query(sql, params);

        sql = `
            SELECT * FROM steps
                WHERE steps_id = ?;
        `
        params = [insertId] 

        let [result, ] = await connection.query(sql, params);

        response.json(result[0]);
    } catch (error) {
        response.status(500).json({
            message: `Unable to create new steps entry: ${error}`
        });
    }
}


module.exports = {
    getSteps,
    logSteps
}