const userSeed = require('./data/users-data');
const stepsSeed = require('./data/steps-data');
const preferencesSeed = require('./data/prefereces-data');

const mysql = require('mysql2/promise');
const config = require('../config');

async function seed() {
    const connnection = await mysql.createConnection(config.db);

    for (let user of userSeed) {
        await connnection.query(
            `
            INSERT INTO users(username, email, password)
                VALUES (?, ?, ?);
            `, 
            [user.username, user.email, user.password]
        );
    }

    for (let preference of preferencesSeed) {
        await connnection.query(
            `
            INSERT INTO preferences(user_id, tooltips)
                VALUES (?, ?);
            `, 
            [preference.user_id, preference.tooltips]
        );
    }

    for (let steps of stepsSeed) {
        await connnection.query(
            `
            INSERT INTO steps(entry_logged, steps, mins_walked, user_id) 
                VALUES (FROM_UNIXTIME(?), ?, ?, ?);
            `, 
            [steps.entry_logged, steps.steps, steps.mins_walked, steps.user_id]
        );
    }
}

seed();