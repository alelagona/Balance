import { Link } from "react-router-dom";
import { useState } from "react";
import "../style/Form.css";

function Form({ register }) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (register) {
      const user = { name, surname, email, password };

      fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((response) => {
        if (response.status === 500) alert("Server error");
        else alert("Utente registrato");
      });
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit}>
        {register ? (
          <>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome"
              required
              maxLength={50}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="cognome"
              id="cognome"
              placeholder="Cognome"
              required
              maxLength={50}
              onChange={(e) => setSurname(e.target.value)}
            />
          </>
        ) : null}
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {register ? (
          <input
            type={showPassword ? "text" : "password"}
            name="password-conf"
            id="password-conf"
            placeholder="Conferma password"
            required
          />
        ) : null}
        <div className="show-password-container">
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
            <div className="under-submit-container">
              Hai già un account?
              <Link to="/login" style={{ paddingLeft: "0.4rem" }}>
                Accedi
              </Link>
            </div>
          </>
        ) : (
          <>
            <input type="submit" value="Accedi" />
            <div className="under-submit-container">
              Non hai ancora un account?
              <Link to="/register" style={{ paddingLeft: "0.4rem" }}>
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
