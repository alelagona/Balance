import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../style/Form.css";

function Form({ register }) {
	const [message, setMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
			setMessage("⚠ Tutti i campi sono obbligatori");
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		if (register) {
			if (!name || !surname) {
				setMessage("⚠ Tutti i campi sono obbligatori");
				window.scrollTo({ top: 0, behavior: "smooth" });
				return;
			}
			if (!validateEmail(email)) {
				setMessage("⚠ Inserire un'email valida");
				return;
			}

			if (password !== document.getElementById("password-conf").value) {
				setMessage("⚠ Le password non coincidono");
				window.scrollTo({ top: 0, behavior: "smooth" });
				return;
			}

			if (!validatePassword(password)) {
				setMessage(
					<div>
						<h3>⚠ La password deve contenere almeno:</h3>
						<ul>
							<li>8 caratteri</li>
							<li>Una lettera maiuscola</li>
							<li>Un numero</li>
							<li>
								Un carattere speciale (come !, @, #, $, ecc.)
							</li>
						</ul>
					</div>
				);
				window.scrollTo({ top: 0, behavior: "smooth" });
				return;
			}
		}

		if (register) {
			const user = { name, surname, email, password };

			try {
				const res = await axios.post(
					"http://localhost:3000/register",
					user
				);
				alert("Utente registrato con successo");
			} catch (error) {
				switch (error.response.status) {
					case 409:
						alert("Email già registrata");
						break;
					case 500:
						alert("Errore del server");
						break;
					default:
						alert("Errore sconosciuto");
				}
			}
    } else {
      const user = { email, password };

      try {
        const res = await axios.post(
					"http://localhost:3000/login",
					user
        );
				alert("Accesso riuscito");
      } catch (error) {
				switch (error.response.status) {
					case 401:
						alert("Credenziali errate");
						break;
					case 500:
						alert("Errore del server");
						break;
					default:
						alert("Errore sconosciuto");
				}
			}
    }
	};

	return (
		<div className="page-container">
			<form onSubmit={handleSubmit}>
				{message ? (
					<div className="over-form">
						<h3>{message}</h3>
					</div>
				) : null}
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
				<div className="show-password">
					<input
						type="checkbox"
						id="show-password"
						onClick={() => setShowPassword(!showPassword)}
					/>
					<label htmlFor="show-password">Mostra password</label>
				</div>
				{register ? (
					<>
						<input type="submit" value="Registrati" />
						<div>
							Hai già un account?
							<Link to="/login" style={{ paddingLeft: "0.4rem" }}>
								Accedi
							</Link>
						</div>
					</>
				) : (
					<>
						<input type="submit" value="Accedi" />
						<div>
							Non hai ancora un account?
							<Link
								to="/register"
								style={{ paddingLeft: "0.4rem" }}
							>
								Registrati
							</Link>
						</div>
					</>
				)}
			</form>
		</div>
	);
}

export default Form;
