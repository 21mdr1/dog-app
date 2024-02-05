const mysql = require('mysql2/promise');
const config = require('../config');

async function getStepsForDaysAgo(daysAgo, userId) {
    const connection = await mysql.createConnection(config.db);

    try {
        let timezoneOffset = new Date().getTimezoneOffset() * 60000;

        let date = new Date(Date.now() - daysAgo * (1000 * 3600 * 24) - timezoneOffset).toISOString().split('T')[0];

        let startDate = date + ' 00:00';
        let endDate = date + ' 23:59';

        let sql = `
            SELECT
                DATE_FORMAT(entry_logged, '%e/%c/%Y') AS formatted_date,
                AVG(UNIX_TIMESTAMP(entry_logged)*1000) AS date,
                SUM(steps) AS steps
            FROM steps 
            WHERE (user_id = ?) 
                AND (entry_logged >= ? + INTERVAL 0 SECOND)
                AND (entry_logged <= ? + INTERVAL 0 SECOND)
            GROUP BY formatted_date;
        `;

        let params = [userId, startDate, endDate];
        let [result, ] = await connection.query(sql, params);

        if (result.length === 0) {
            result = [{ steps: 0 }]
        }

        connection.end();

        return result;
    } catch (error) {
        console.log('Error fetching steps', error);
        connection.end();
        return [{}]
    }
}

async function streakShouldBeIncreased(steps, userId) {
    try {
        let [result, ] = await getStepsForDaysAgo(0, userId);
        let recordedSteps = result.steps;
        return (recordedSteps < 10000 && recordedSteps + steps >= 10000);
    } catch (error) {
        return false;
    }
}

async function streakShouldBeReset(todaysSteps, userId) {
    try {
        let [result, ] = await getStepsForDaysAgo(1, userId);
        let yesterdaysSteps = result.steps;

        return (yesterdaysSteps < 10000 && todaysSteps < 10000);

    } catch (error) {
        console.log('Error checking if streak should be reset', error);
        return false;
    }
}

async function checkIncreaseStreak(todaysSteps, userId) {
    const connection = await mysql.createConnection(config.db);

    try {
        if(await streakShouldBeIncreased(todaysSteps, userId)) {
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
    } finally {
        connection.end();
    }
    
}

async function checkResetStreak(todaysSteps, userId) {
    const connection = await mysql.createConnection(config.db);
    try {
        if(await streakShouldBeReset(todaysSteps, userId)) {
            let increaseSql = `
                UPDATE users
                    SET streak = 0
                    WHERE user_id = ?
            `
            let increaseParams = [userId]
            await connection.query(increaseSql, increaseParams);
        }
    } catch (error) {
        console.log('Error reseting streak', error);
    } finally {
        connection.end();
    }
}

module.exports = {
    checkIncreaseStreak,
    checkResetStreak
}