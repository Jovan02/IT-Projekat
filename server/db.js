const mysql = require("mysql");

const serverData = {
    host: "localhost",
    user: "root",
    password: "Jovan2801",
    database: "cinemadb",
    port: 3306,
};

const connection = mysql.createConnection(serverData);

module.exports = connection;
