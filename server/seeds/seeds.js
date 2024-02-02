const userSeed = require('./data/users-data');
const stepsSeed = require('./data/steps-data');
const preferencesSeed = require('./data/preferences-data');

const mysql = require('mysql2/promise');
const config = require('../config');

async function seed() {
    const connection = await mysql.createConnection(config.db);

    await connection.query(
        `
        DELETE FROM steps;
        `
    );

    await connection.query(
        `
        DELETE FROM preferences;
        `
    );

    await connection.query(
        `
        DELETE FROM users;
        `
    );

    for (let user of userSeed) {
        await connection.query(
            `
            INSERT INTO users(user_id, streak, username, email, password)
                VALUES (?, ?, ?, ?);
            `, 
            [user.user_id, user.streak, user.username, user.email, user.password]
        );
    }

    for (let preference of preferencesSeed) {
        await connection.query(
            `
            INSERT INTO preferences(user_id, avatar, tooltips)
                VALUES (?, ?);
            `, 
            [preference.user_id, preference.avatar, preference.tooltips]
        );
    }

    for (let steps of stepsSeed) {
        await connection.query(
            `
            INSERT INTO steps(entry_logged, steps, mins_walked, user_id) 
                VALUES (FROM_UNIXTIME(?), ?, ?, ?);
            `, 
            [steps.entry_logged, steps.steps, steps.mins_walked, steps.user_id]
        );
    }

    process.exit();
}

seed();