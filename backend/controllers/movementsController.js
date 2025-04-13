import pool from "../config/db.js";

export const getMovements = async(req, res) => {
	const { userId, year, month } = req.params;

	const query = `
		SELECT
			TO_CHAR(date, 'DD/MM/YYYY') AS date,
			description,
			category,
			amount
		FROM
			movements
		WHERE
			user_id = $1
			AND EXTRACT(YEAR FROM date) = $2
			AND EXTRACT(MONTH FROM date) = $3
	`;

	try {
		const result = await pool.query(query, [userId, year, month])
		res.status(200).json(result.rows);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
}

export const getChartInfo = async (req, res) => {
	const { userId, year, month } = req.params;
	
	const query = `
		SELECT
			category,
			ROUND(SUM(amount) * 100 / (SELECT SUM(amount) FROM movements), 2) AS percentage,
			SUM(amount) AS amount
		FROM
			movements
		WHERE
			user_id = $1
			AND EXTRACT(YEAR FROM date) = $2
			AND EXTRACT(MONTH FROM date) = $3
		GROUP BY
			category
	`;

	try {
		const result = await pool.query(query, [userId, year, month])
		res.status(200).json(result.rows);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};