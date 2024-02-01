require('dotenv').config();
const mysql = require('mysql2/promise');
const config = require('../config');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET_KEY } = process.env;

const { emailIsValid, passwordIsValid } = require('../utils/validationUtils');

const createUser = async (request, response) => {
    let {user, preferences, steps} = request.body;

    if ( !user.username || !user.email || !user.password ) {
        return response.status(400).json({
            message: "Please provide username, email, and password for new user in the request"
        });
    }

    if ( !emailIsValid(user.email) || !passwordIsValid(user.password) ) {        
        return response.status(400).json({
            message: "Email must be of the form 'yourname@example.com' and password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special characte"
        });
    }

    try {

        const connection = await mysql.createConnection(config.db);

        // create user

        let userSql = `
            INSERT INTO users
                SET ?;
        `;
        let passwordHash = await bcrypt.hash(user.password, Number(SALT_ROUNDS));
        let userParams = { username: user.username, email: user.email, password: passwordHash};

        let [{ insertId }, ] = await connection.query(userSql, userParams);

        // create preferences entry

        if (!preferences) {
            preferences = {}
        }

        if (preferences.avatar === undefined) {
            preferences.avatar = null;
        }
        if (preferences.tooltips === undefined) {
            preferences.tooltips = true;
        }

        let preferencesSql = `
            INSERT INTO preferences
                SET ?;
        `;
        let preferencesParams = { avatar: preferences.avatar, user_id: insertId, tooltips: preferences.tooltips };

        connection.query(preferencesSql, preferencesParams);

        // move steps

        if (steps && steps.length !== 0) {
            let stepsSql = `
                INSERT INTO steps(entry_logged, steps, mins_walked, user_id) 
                    VALUES (FROM_UNIXTIME(?), ?, ?, ?);
            `;

            for(let stepsEntry of steps) {
                await connection.query(stepsSql, [Math.floor(stepsEntry.timestamp / 1000), stepsEntry.steps, stepsEntry.minsWalked, insertId]);
            }
        }
        
        // send back user

        let getUserSql = `
            SELECT user_id, username, email, accnt_creation FROM users
                WHERE user_id = ?;
        `;

        let getUserParams = [insertId];

        let [result, ] = await connection.query(getUserSql, getUserParams);

        response.status(201).json(result[0]);

    } catch (error) {
        response.status(500).json({
            message: `Unable to create new user: ${error}`
        });
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

const getStreak = async (request, response) => {
    let userId = request.user_id;

    try {
        let sql = `
            SELECT streak FROM users
                WHERE user_id = ?;
        `;

        let params = [userId]

        const connection = await mysql.createConnection(config.db);
        let [result, ] = await connection.query(sql, params);

        if (result.length === 0) {
            return response.status(404).json({
                message: `Streak for user with ID: ${userId} not found`
            });
        }

        response.json({
            streak: result[0].steak
        });

    } catch(error) {
        response.status(500).json({
            message: `Error fetching streak for user with ID ${userId}: ${error}`
        });
    }

}

module.exports = {
    createUser,
    login,
    getStreak
}