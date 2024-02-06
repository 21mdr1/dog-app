require('dotenv').config();
const mysql = require('mysql2/promise');
const config = require('../config');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET_KEY } = process.env;

const { emailIsValid, passwordIsValid } = require('../utils/validationUtils');

const createUser = async (request, response) => {
    let {user, preferences, steps, streak} = request.body;

    if ( !user.username || !user.email || !user.password ) {
        return response.status(400).json({
            message: "Please provide username, email, and password for new user in the request"
        });
    }

    streak = isNaN(Number(streak)) ? 0 : Number(streak);

    if ( !emailIsValid(user.email) || !passwordIsValid(user.password) ) {        
        return response.status(400).json({
            message: "Email must be of the form 'yourname@example.com' and password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special characte"
        });
    }

    const connection = await mysql.createConnection(config.db);

    try {

        // create user

        let userSql = `
            INSERT INTO users
                SET ?;
        `;
        let passwordHash = await bcrypt.hash(user.password, Number(SALT_ROUNDS));
        let userParams = { username: user.username, email: user.email, password: passwordHash, streak: streak};

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
        
        // send back token

        let token = jwt.sign(
            {user_id: insertId},
            SECRET_KEY
        )

        response.status(201).json({
            token: token
        });

    } catch (error) {
        response.status(500).json({
            message: `Unable to create new user: ${error}`
        });
    } finally {
        connection.end();
    }
    
}

const login = async (request, response) => {
    let { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).json({
            message: "Please include a username and password in the request"
        });
    }

    const connection = await mysql.createConnection(config.db);

    try {
        let sql = `
            SELECT user_id, username, password FROM users
                WHERE username = ?;
        `;
        let params = [username];

        let [result, ] = await connection.query(sql, params);

        if (result.length === 0) {
            connection.end();
            return response.status(404).json({
                message: `User with username ${username} not found`
            });
        }

        let passwordMatches = await bcrypt.compare(password, result[0].password);

        if (!passwordMatches) {
            connection.end();
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
    } finally {
        connection.end();
    }
}

const getStreak = async (request, response) => {
    let userId = request.user_id;

    const connection = await mysql.createConnection(config.db);

    try {
        let sql = `
            SELECT streak FROM users
                WHERE user_id = ?;
        `;

        let params = [userId]

        let [result, ] = await connection.query(sql, params);

        if (result.length === 0) {
            connection.end();
            return response.status(404).json({
                message: `Streak for user with ID: ${userId} not found`
            });
        }

        response.json(result[0]);

    } catch(error) {
        response.status(500).json({
            message: `Error fetching streak for user with ID ${userId}: ${error}`
        });
    } finally {
        connection.end();
    }
}

const checkUsername = async (request, response) => {
    let { username } = request.body;

    if (!username) {
        return response.status(400).json({
            message: "Please include a username in the request"
        }); 
    }

    const connection = await mysql.createConnection(config.db);

    try {
        let sql = `
            SELECT * FROM users
                WHERE ?
        `

        let params = {username: username};

        let [result, ] = await connection.query(sql, params);

        response.json({
            exists: result.length === 0 ? false : true,
        });

    } catch (error) {
        response.status(500).json({
            message: `Error checking if username ${username} exists: ${error}`
        });
    } finally {
        connection.end();
    }

}

module.exports = {
    createUser,
    login,
    getStreak,
    checkUsername
}