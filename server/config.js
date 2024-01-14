require('dotenv').config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const config = {
    db: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        timeout: 60000,
    },
    listPerPage: 10,
}

module.exports = config;