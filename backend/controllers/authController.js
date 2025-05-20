import { registerService, loginService } from "../services/authService.js"

export const register = async (req, res) => {
	const { name, surname, email, password } = req.body;

	try {
		await registerService(name, surname, email, password);
		res.status(201).send('User successfully registered');
	} catch (error) {
		if (error.message === 'EMAIL_ALREADY_EXISTS')
			res.status(409).send('Email already registered');
		else
			res.status(500).send('Internal server error');
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await loginService(email, password);
		req.session.user = user;
		res.status(200).json(user);
	} catch (error) {
		if (error.message === 'INVALID_CREDENTIALS')
			res.status(401).send('Invalid credentials');
		else 
			res.status(500).send('Internal server error')
	}
}
