import "../style/Header.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
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

export default Header;
