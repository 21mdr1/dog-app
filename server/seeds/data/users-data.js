require('dotenv').config();
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = process.env;

module.exports = [
    {
        user_id: 1,
        streak: 0,
        username: "testUser",
        password: bcrypt.hashSync("test123", Number(SALT_ROUNDS)),
        email: "test1@example.com",
    }
];