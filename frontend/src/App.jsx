import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Form from "./components/Form/Form.jsx";
import Home from "./components/Home/Home.jsx";
import "./App.css";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Form />} />
				<Route path="/register" element={<Form register={true} />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
