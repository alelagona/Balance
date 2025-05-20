import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const registerService = async (name, surname, email, password) => {
	const checkQuery = 'SELECT * FROM users WHERE email = $1';
	const checkResult = await pool.query(checkQuery, [email]);

	if (checkResult.rowCount != 0)
		throw new Error("EMAIL_ALREADY_EXISTS");
	
	const hashedPassword = await bcrypt.hash(password, 10);

	const insertQuery = `
	INSERT INTO users (name, surname, email, password)
	VALUES ($1, $2, $3, $4)
	`;
	await pool.query(insertQuery, [name, surname, email, hashedPassword]);
}

export const loginService = async (email, password) => {
	const query = 'SELECT * FROM users WHERE email = $1';
	const result = await pool.query(query, [email]);

	if (result.rowCount === 0)
		throw new Error('INVALID_CREDENTIALS');
	
	const user = result.rows[0];
	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch)
		throw new Error("INVALID_CREDENTIALS");

	const { password: _, ...userWithoutPassword } = user;
	return userWithoutPassword;
}