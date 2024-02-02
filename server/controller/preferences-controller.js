const mysql = require('mysql2/promise');
const config = require('../config');

const getPreferences = async (request, response) => {
    try {
        let sql = `
            SELECT * FROM preferences
                WHERE ?;
        `;
        let params = { user_id: request.user_id };

        const connection = await mysql.createConnection(config.db);
        let [result, _fields] = await connection.query(sql, params);

        if (result.length === 0) {
            return response.status(404).json({
                message: `Preferences for user with ID ${requser.params.id} not found`
            })
        }

        response.json(result[0]);

    } catch (error) {
        response.status(500).json({
            message: `Unable to retrieve preferences for user with ID ${request.params.userId}`
        });

    }
}

const createPreferences = async (request, response) => {
    let { avatar, tooltips } = request.body;
    let userId = request.user_id;

    if (!avatar) {
        avatar = null;
    }
    if (!tooltips) {
        tooltips = true;
    }

    try {
        let sql = `
            INSERT INTO preferences
                SET ?;
        `;
        let params = { avatar: avatar, user_id: userId, tooltips: tooltips };

        const connection = await mysql.createConnection(config.db);
        let [{ insertId }, ] = await connection.query(sql, params);

        sql = `
            SELECT * FROM preferences
                WHERE preference_id = ?;
        `
        params = [insertId];

        let [result, ] = await connection.query(sql, params);

        response.status(201).json(result[0]);
    } catch (error) {
        response.status(500).json({
            message: `Unable to create new preferences entry: ${error}`
        });
    }
}

const changePreferences = async (request, response) => {
    let { preferences } = request.body;
    let userId = request.user_id;

    try {
        let sql = `
            UPDATE preferences
                SET ?
                WHERE user_id = ?;
        `;
        let params = [{preferences}, userId];

        const connection = await mysql.createConnection(config.db);
        let [{ changedRows }, ] = await connection.query(sql, params);

        if(changedRows === 0) {
            return response.status(404).json({
                message: `Preferences item for user with ID ${userId} not found`
            });
        }

        sql = `
            SELECT * FROM preferences
                WHERE user_id = ?;
        `;
        params = [userId];

        let [result, ] = await connection.query(sql, params);

        response.json(result[0]);
    } catch (error) {
        response.status(500).json({
            message: `Unable to update the preferences for user with ID ${request.body.userId}: ${error}`
        });
    }    
}

module.exports = {
    getPreferences,
    createPreferences,
    changePreferences,
}