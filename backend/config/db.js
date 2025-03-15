const mysql = require("mysql2");

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "balance",
});
  
database.connect((err) => {
    if (err) console.log("Can't connect to the database.");
    else console.log("Connected to the database.");
});
  
module.exports = database;