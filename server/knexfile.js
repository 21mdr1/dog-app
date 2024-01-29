require("dotenv").config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

module.exports = {
  client: "mysql2",
  connection: {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    charset: "utf8",
  },
};