import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import useUser from "../../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Header() {
	const location = useLocation();
	const { user } = useUser();
	const [open, setOpen] = useState(false);

	return (
		<header>
			<Link to="/" id="balance">
				<div id="balance">
					<h1>Balance</h1>
				</div>
			</Link>
			<nav>
				{location.pathname === "/" ? (
					<Link to="/login" id="login-link">
						<h2>Accedi</h2>
					</Link>
				) : location.pathname === "/dashboard" && user ? (
					<div id="user">
						<h2> {user.name}</h2>
						<button id="menu" onClick={() => setOpen(!open)}>
							<FontAwesomeIcon icon={faBars} id="user-icon" />
						</button>
						{open ? (
							<ul id="dropdown-menu">
								<li><h3>Logout</h3></li>
							</ul>
						) : null}
					</div>
				) : null}
			</nav>
		</header>
	);
}

export default Header;
