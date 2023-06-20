import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login";
import RegistrationPage from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import { useState } from "react";
import ProtectedRoute from "./utils/PrivateRoute ";
import useStore from "./store";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setLoginStatus = useStore((state) => state.setLoginStatus);

  const handleLogin = () => {
    setLoginStatus(true);
  };

  const handleLogout = () => {
    setLoginStatus(false);
  };

  return (
    <Router>
      <Routes>
        <Route index element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route element={<ProtectedRoute isAutenticate={isLoggedIn} />}>
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
