import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import useUserContext from "../../hooks/useUserContext";
import useSidebarContext from "../../hooks/useSidebarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function Header() {
	const location = useLocation();
	const { user, setUserContext } = useUserContext();
	const { open, setOpen } = useSidebarContext();
	const navigate = useNavigate();

	const logout = () => {
		setUserContext(null);
		navigate("/");
	};

	useEffect(() => {
		{
			open ? <div></div> : null;
		}
	}, [open]);

	useEffect(() => {
		setOpen(false);
	}, [user, location.pathname]);

	return (
		<>
			<header>
				<Link to="/" id="balance">
					<div id="balance">
						<h1>Balance</h1>
					</div>
				</Link>
				<nav>
					{!user ? (
						<Link to="/login" id="login-link">
							<h2>Accedi</h2>
						</Link>
					) : (
						<>
							<h2> {user.name}</h2>
							<button
								id="menu"
								onClick={() => setOpen(!open)}
							>
								<FontAwesomeIcon icon={faBars} id="bars-icon" />
							</button>
						</>
					)}
				</nav>
			</header>
			<div id="sidenav" className={open ? `open` : ``}>
				<ul>
					<li>
						<h3>Opzione</h3>
					</li>
					<li>
						<h3>Opzione</h3>
					</li>
					<li>
						<h3>Opzione</h3>
					</li>
					<li>
						<h3><button onClick={logout}>Logout</button></h3>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Header;
