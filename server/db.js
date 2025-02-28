const mysql = require("mysql");
require("dotenv").config({ path: ".env" });

const serverData = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
};

const connection = mysql.createConnection(serverData);

module.exports = connection;
