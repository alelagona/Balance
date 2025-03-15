const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "balance",
});

db.connect((err) => {
  if (err) console.log("Can't connect to the database.");
  else console.log("Connected to the database.");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//API
app.get("/api/movements/:user_id/:year/:month", (req, res) => {
  const { user_id, year, month } = req.params;

  const query = `
    SELECT
      DATE_FORMAT(date, '%d/%m/%Y') AS date,
      description,
      category,
      amount
    FROM
      movements
    WHERE
      user_id = ?
      AND YEAR(date) = ?
      AND MONTH(date) = ?
  `;

  db.execute(query, [user_id, year, month], (_, data) => {
    return res.json(data);
  });
});

app.get("/api/summary/:user_id/:year/:month", (req, res) => {
  const { user_id, year, month } = req.params;

  const query = `
    SELECT
      category AS name,
      SUM(amount) AS value
    FROM
      movements
    GROUP BY
      category
  `;

  db.execute(query, [user_id, year, month], (_, data) => {
    return res.json(data);
  });
});
