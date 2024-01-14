const mysql = require('mysql2/promise');
const config = require('./config');

async function query(query, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(query, params);
    return results;
}

module.exports = query;