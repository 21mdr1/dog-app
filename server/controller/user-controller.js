const mysql = require('mysql2/promise');
const config = require('../config');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const { emailIsValid, passwordIsValid } = require('../utils/validationUtils');

const createUser = async (request, response) => {
    let { username, email, password } = request.body;

    if ( !username || !email || !password ) {
        return response.status(400).json({
            message: "Please provide username, email, and password for new user in the request"
        });
    }

    if ( !emailIsValid(email) || !passwordIsValid(password) ) {        
        return response.status(400).json({
            message: "Email must be of the form 'yourname@example.com' and password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special characte"
        });
    }

    try {
        let sql = `
            INSERT INTO users
                SET ?;
        `;
        let passwordHash = await bcrypt.hash(password, saltRounds);
        let params = { username: username, email: email, password: passwordHash};

        const connection = await mysql.createConnection(config.db);
        let [{ insertId }, ] = await connection.query(sql, params);

        sql = `
            SELECT user_id, username, email, accnt_creation FROM users
                WHERE user_id = ?;
        `;

        params = [insertId];

        let [result, ] = await connection.query(sql, params);

        response.status(201).json(result[0]);

    } catch (error) {
        response.status(500).json({
            message: `Unable to create new user: ${error}`
        })
    }
    
}

module.exports = {
    createUser,
}