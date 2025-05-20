import pool from "../config/db.js";

export const getTransactionsService = async (user_id, year, month) => {
	const query =  `
	SELECT
		TO_CHAR(date, 'DD/MM/YYYY') AS date,
		description,
		category,
		amount
	FROM
		transactions
	WHERE
		user_id = $1
		AND EXTRACT(YEAR FROM date) = $2
		AND EXTRACT(MONTH FROM date) = $3
	ORDER BY
		date
	`;
	const result = await pool.query(query, [user_id, year, month]);
	
	return result.rows;
}

export const getChartInfoService = async (user_id, year, month) => {
	const query = `
	SELECT
		category,
		ROUND(SUM(amount) * 100 / (SELECT SUM(amount) FROM transactions), 2) AS percentage,
		SUM(amount) AS amount
	FROM
		transactions
	WHERE
		user_id = $1
		AND EXTRACT(YEAR FROM date) = $2
		AND EXTRACT(MONTH FROM date) = $3
	GROUP BY
		category
	ORDER BY
		category
	`;

	const result = await pool.query(query, [user_id, year, month]);
	return result.rows;
}