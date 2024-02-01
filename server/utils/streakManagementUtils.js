const mysql = require('mysql2/promise');
const config = require('../config');

async function streakShouldBeIncreased(steps, userId) {
    try {
        const connection = await mysql.createConnection(config.db);
        let startDate = new Date(Date.now()).toISOString().split('T')[0] + ' 00:00';

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

        let [result, ] = await connection.query(sql, params);

        return (result[0].steps < 10000 && result[0].steps + steps >= 10000);

    } catch (error) {
        console.log('Error checking if streak should be incresed', error);
        return false;
    }
}

async function increaseStreak(steps, userId) {
    try {
        const connection = await mysql.createConnection(config.db);
        if(streakShouldBeIncreased(steps, userId)) {
            let increaseSql = `
                UPDATE users
                    SET streak = streak + 1
                    WHERE user_id = ?
            `
            let increaseParams = [userId]
            await connection.query(increaseSql, increaseParams);
        }
    } catch (error) {
        console.log('Error increasing streak', error);
    }
    
}

module.exports = {
    increaseStreak,
}