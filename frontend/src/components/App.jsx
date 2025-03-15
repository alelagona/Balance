import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Dashboard from "./Dashboard.jsx";
import Form from "./Form.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Form />} />
        <Route path="/register" element={<Form register={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
