import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
	const { name, surname, email, password } = req.body;

	const checkQuery = `
		SELECT * FROM users WHERE email = $1
	`;

	const insertQuery = `
		INSERT INTO users (name, surname, email, password)
		VALUES ($1, $2, $3, $4)
	`;

	try {
		const result = await pool.query(checkQuery, [email]);
		if (result.rowCount > 0) {
			res.status(409).send('Email already registered');
			return;
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		await pool.query(insertQuery, [name, surname, email, hashedPassword]);
		res.status(201).send('User successfully registered');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body;

	const query = `
		SELECT password
		FROM users
		WHERE email = $1
	`;

	try {
		const result = await pool.query(query, [email]);

		if (result.rowCount === 0) {
			res.status(401).send('Invalid email');
			return;
		}
	
		if (!await bcrypt.compare(password, result.rows[0].password)) {
			res.status(401).send('Invalid password');
			return;
		}
	
		res.status(200).send('User logged in');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
}