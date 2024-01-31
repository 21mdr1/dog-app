const jwt = require("jsonwebtoken");
const mysql = require('mysql2/promise');
const config = require('../config');
require('dotenv').config();
const { SECRET_KEY } = process.env;

async function query(query, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(query, params);
    return results;
}

function emptyOrRows(rows) {
    return !!rows ? rows : [];
}


function  authenticate(request, response, next) {
    const token = request.headers.authorization.slice("Bearer ".length +  1, -1);

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        request.user_id = payload.user_id;

        next();
    } catch (error) {
        response.sendStatus(401);
    }
}

module.exports = {
    query,
    emptyOrRows,
    authenticate,
};