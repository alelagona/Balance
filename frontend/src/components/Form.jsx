import { Link } from "react-router-dom";
import "../style/Form.css";

function Form({ register }) {
  return (
    <>
      <form>
        {register ? (
          <>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome"
              required={true}
            />
            <input
              type="text"
              name="cognome"
              id="cognome"
              placeholder="Cognome"
              required={true}
            />
          </>
        ) : null}
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          required={true}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required={true}
        />
        {register ? (
          <input
            type="password"
            name="password-conf"
            id="password-conf"
            placeholder="Conferma password"
            required={true}
          />
        ) : null}
        <div className="show-password-container">
          <input type="checkbox" id="show-password" />
          <label htmlFor="show-password">Mostra password</label>
        </div>
        {register ? (
          <>
            <input type="submit" value="Registrati" />
            <div className="under-submit-container">
              Hai già un account?
              <Link to="/login" style={{ "padding-left": "0.4rem" }}>Accedi</Link>
            </div>
          </>
        ) : (
          <>
            <input type="submit" value="Accedi" />
            <div className="under-submit-container">
              Non hai ancora un account?
              <Link to="/register" style={{"padding-left": "0.4rem"}}>Registrati</Link>
            </div>
          </>
        )}
      </form>
    </>
  );
}

{
  /*

    <>
    ,  <form>  
        {login ?( <><input
          type="text"
          name="nome"
          id="nome"
          placeholder="Nome*"
          required={true}
        />
        <input type="text" name="cognome" id="cognome" placeholder="Cognome" />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail*"
          required={true}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password*"
          required={true}
        />
        <div className="show-password-container">
          <input
            type="checkbox"
            id="show-password"
          />
          <label htmlFor="show-password">Mostra password</label>
        </div>
        <input type="submit" value="Registrati" required={true} /> </>): null}
      </form>
      <div className="under-submit-container">Hai già un account? Accedi</div>
        
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Nome*"
          required={true}
        />
        <input type="text" name="cognome" id="cognome" placeholder="Cognome" />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail*"
          required={true}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password*"
          required={true}
        />
        <div className="show-password-container">
          <input
            type="checkbox"
            id="show-password"
          />
          <label htmlFor="show-password">Mostra password</label>
        </div>
        <input type="submit" value="Registrati" required={true} />
      </form>
      <div className="under-submit-container">Hai già un account? Accedi</div>
    </>
  );
}*/
}

export default Form;
