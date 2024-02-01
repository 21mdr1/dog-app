require('dotenv').config();
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = process.env;

module.exports = [
    {
        user_id: 1,
        username: "testUser",
        password: bcrypt.hash("test123", Number(SALT_ROUNDS)),
        email: "test1@example.com",
    }
];