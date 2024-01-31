require('dotenv').config();
const mysql = require('mysql2/promise');
const config = require('../config');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET_KEY } = process.env;

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
        let passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
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

const login = async (request, response) => {
    let { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).json({
            message: "Please include a username and password in the request"
        });
    }

    try {
        let sql = `
            SELECT user_id, username, password FROM users
                WHERE username = ?;
        `;
        let params = [username];

        const connection = await mysql.createConnection(config.db);
        let [result, ] = await connection.query(sql, params);

        if (result.length === 0) {
            return response.status(404).json({
                message: `User with username ${username} not found`
            });
        }

        let passwordMatches = await bcrypt.compare(password, result[0].password);

        if (!passwordMatches) {
            return response.status(401).json({
                message: `Username and password pair do not match`
            });
        }

        let token = jwt.sign(
            {user_id: result[0].user_id},
            SECRET_KEY
        )

        response.json({
            token: token
        });

    } catch (error) {
        response.status(500).json({
            message: `Error logging in user with username ${username}: ${error}`
        })
    }
}

module.exports = {
    createUser,
    login
}