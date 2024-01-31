const mysql = require('mysql2/promise');
const config = require('../config');

const createUser = async (request, response) => {
    let {username, email, password} = request.body;

    let sql = `
        INSERT INTO users(username, email, password)
            values (?, ?, ?);
    `;
    let params = [username, email, password];

    const connection = await mysql.createConnection(config.db);
    let [result, ] = await connection.query(sql, params);

    response.json(result);
}

module.exports = {
    createUser,
}