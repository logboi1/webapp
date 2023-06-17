import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login";
import RegistrationPage from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import { useState } from "react";
import ProtectedRoute from "./utils/PrivateRoute ";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route index element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route element={<ProtectedRoute isAutenticate={isAuthenticated} />}>
          <Route
            path="dashboard"
            element={<Dashboard onLogout={handleLogout} />}
          />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
}

export default App;
