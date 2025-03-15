import { Link, useLocation } from "react-router-dom";
import "../style/Header.css";

function HeadFoot() {
  const location = useLocation();

  return (
      <header>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Balance</h1>
        </Link>
        <nav>
          {location.pathname === "/" ? (
            <Link to="/login" id="login-link">
              <h2>Accedi</h2>
            </Link>
          ) : null}
        </nav>
      </header>
  );
}

export default HeadFoot;
