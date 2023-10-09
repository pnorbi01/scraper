const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

const db = con.promise();

db.connect(function (err) {
    if (err) throw err;
    console.log("Successfully connected!");
});

module.exports = db;