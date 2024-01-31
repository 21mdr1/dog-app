const mysql = require('mysql2/promise');
const config = require('../config');

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