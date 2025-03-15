import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Footer from "./components/Footer.jsx";
import Form from "./components/Form.jsx";
import "./style/App.css";

function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Form />} />
          <Route path="/register" element={<Form register={true} />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
