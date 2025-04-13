import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Form.css";

function Form({ register }) {
	const { user, setUser } = useContext(UserContext);
	const [message, setMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const validateEmail = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const validatePassword = (password) => {
		return (
			password.length >= 8 &&
			/[a-z]/.test(password) &&
			/[A-Z]/.test(password) &&
			/\d/.test(password) &&
			/[\\/!@#$%^&*(),.?":{}|<>]/.test(password)
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setMessage("");

		if (!email || !password) {
			setMessage(<h4>&#9888; Tutti i campi sono obbligatori.</h4>);
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		if (register) {
			if (!name || !surname) {
				setMessage(<h4>&#9888; Tutti i campi sono obbligatori.</h4>);
				window.scrollTo({ top: 0, behavior: "smooth" });
				return;
			}
			if (!validateEmail(email)) {
				setMessage(
					<h4>&#9888; Inserire un indirizzo e-mail valido.</h4>
				);
				window.scrollTo({ top: 0, behavior: "smooth" });
				return;
			}

			if (password !== document.getElementById("password-conf").value) {
				setMessage(<h4>&#9888; Le password non coincidono.</h4>);
				window.scrollTo({ top: 0, behavior: "smooth" });
				return;
			}

			if (!validatePassword(password)) {
				setMessage(
					<div>
						<h4>
							&#9888; La password deve contenere almeno:
							<ul id="rules">
								<li>8 caratteri</li>
								<li>Una lettera maiuscola</li>
								<li>Un numero</li>
								<li>
									Un carattere speciale (come !, @, #, $,
									ecc.)
								</li>
							</ul>
						</h4>
					</div>
				);
				window.scrollTo({ top: 0, behavior: "smooth" });
				return;
			}
		}

		if (register) {
			try {
				await axios.post("http://localhost:3000/register", {
					name,
					surname,
					email,
					password,
				});
				navigate("/login");
			} catch (error) {
				if (error.response.status === 409) {
					setMessage(<h4>&#9888; E-mail già in uso.</h4>);
					window.scrollTo({ top: 0, behavior: "smooth" });
					return;
				}
				if (error.response.status === 500) {
					setMessage(<h4>&#9888; Il server non risponde.</h4>);
					window.scrollTo({ top: 0, behavior: "smooth" });
					return;
				}
			}
		} else {
			try {
				const loggedUser = (
					await axios.post("http://localhost:3000/login", {
						email,
						password,
					})
				).data;

				setUser(loggedUser);
				navigate("/dashboard");
			} catch (error) {
				if (error.response.status === 401) {
					setMessage(<h4>&#9888; Credenziali errate.</h4>);
					window.scrollTo({ top: 0, behavior: "smooth" });
					return;
				}
				if (error.response.status === 500) {
					setMessage(<h4>&#9888; Il server non risponde.</h4>);
					window.scrollTo({ top: 0, behavior: "smooth" });
					return;
				}
			}
		}
	};

	return (
		<div className="page">
			<form onSubmit={handleSubmit} id="login-register">
				{message ? <div id="over-form">{message}</div> : null}
				{register ? (
					<>
						<input
							type="text"
							name="nome"
							id="nome"
							placeholder="Nome"
							maxLength={50}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							name="cognome"
							id="cognome"
							placeholder="Cognome"
							maxLength={50}
							onChange={(e) => setSurname(e.target.value)}
						/>
					</>
				) : null}
				<input
					type="text"
					name="email"
					id="email"
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type={showPassword ? "text" : "password"}
					name="password"
					id="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				{register ? (
					<input
						type={showPassword ? "text" : "password"}
						name="password-conf"
						id="password-conf"
						placeholder="Conferma password"
					/>
				) : null}
				<div id="show-password">
					<input
						type="checkbox"
						id="show-password-check"
						onClick={() => setShowPassword(!showPassword)}
					/>
					<label htmlFor="show-password-check">
						<h4>Mostra password</h4>
					</label>
				</div>
				{register ? (
					<>
						<input type="submit" value="Registrati" />
						<div className="under-submit">
							<h4>Hai già un account?</h4>
							<Link
								to="/login"
								onClick={() => setMessage("")}
							>
								<h4>Accedi</h4>
							</Link>
						</div>
					</>
				) : (
					<>
						<input type="submit" value="Accedi" />
						<div className="under-submit">
							<h4>Non hai ancora un account?</h4>
							<Link
								to="/register"
								onClick={() => setMessage("")}
							>
								<h4>Registrati</h4>
							</Link>
						</div>
					</>
				)}
			</form>
		</div>
	);
}

export default Form;
