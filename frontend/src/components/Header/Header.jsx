import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import useUser from "../../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

function Header() {
	const location = useLocation();
	const { user, setUserContext } = useUser();
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);
	const navigate = useNavigate();

	const logout = () => {
		setUserContext(null);
		navigate("/login");
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target))
				setOpen(false);
		}

		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setOpen(false);
	}, [user, location.pathname]);

	return (
		<header>
			<Link to="/" id="balance">
				<div id="balance">
					<h1>Balance</h1>
				</div>
			</Link>
			<nav>
				{location.pathname === "/" || location.pathname === "/dashboard" && !user ? (
					<Link to="/login" id="login-link">
						<h2>Accedi</h2>
					</Link>
				) : location.pathname === "/dashboard" && user ? (
					<div id="user">
						<h2> {user.name}</h2>
						<button
							id="menu"
							onClick={() => setOpen(!open)}
							ref={menuRef}
						>
							<FontAwesomeIcon icon={faBars} id="user-icon" />
						</button>
						{open ? (
							<ul id="dropdown-menu">
								<li>
									<h3>
										<button id="logout" onClick={logout}>
											Logout
										</button>
									</h3>
								</li>
							</ul>
						) : null}
					</div>
				) : null}
			</nav>
		</header>
	);
}

export default Header;
