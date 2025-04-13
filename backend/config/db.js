import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	password: 'password',
	port: 5432,
	database: 'balance',
});

export default pool;