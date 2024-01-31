const mysql = require('mysql2/promise');
const config = require('../config');

const getPreferences = async (request, response) => {
    try {
        let sql = `
            SELECT * FROM preferences
                WHERE ?;
        `;
        let params = {user_id: request.params.userId };

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

module.exports = {
    getPreferences,
}