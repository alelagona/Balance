const db = require("../config/db");

exports.getMonthlyMovements = (req, res) => {
    const { userId, year, month } = req.params;

    const query = `
        SELECT
            DATE_FORMAT(date, '%d/%m/%Y') AS date,
            description,
            amount,
            category
        FROM
            movements
        WHERE
            user_id = ?
            AND YEAR(date) = ?
            AND MONTH(date) = ?
    `;

    db.execute(query, [userId, year, month], (err, results) => {
        if (err)
            return res.status(500).json({ message: "An error occurred during query execution." });
        if(res.length === 0)
            return res.status(404).json({ message: "No movements found." });

        return res.status(200).json(results)
    });
};

exports.getCatExpenses = (req, res) => {
    const { userId, year, month } = req.params;

    const query = `
        SELECT
            category AS name,
            SUM(amount) AS value
        FROM
            movements
        WHERE
            user_id = ?
            AND YEAR(date) = ?
            AND MONTH(date) = ?
        GROUP BY
            category
    `;

    db.execute(query, [userId, year, month], (err, results) => {
        if(err)
            return res.status(500).json({ message: "An error occurred during query execution." });
        if(res.length === 0)
            return res.status(404).json({ message: "No categories found." });

        return res.status(200).json(results)
    });
};