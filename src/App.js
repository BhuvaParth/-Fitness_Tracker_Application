import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./componets/Auth/Login";
import SignUp from "./componets/Auth/SignUp";
import FitnessForm from "./componets/Form/FitnessForm";
import Header from "./componets/Header";
import Home from "./componets/pages/Home";
import AdminDashboard from "./Dashboard/AdminDashboard";
import { WorkoutProvider } from "./componets/WorkoutProvider";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem("auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  const showHeader = !["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {showHeader && (
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      )}
      <WorkoutProvider>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home to="/admindashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/fitnessForm" element={<FitnessForm />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </WorkoutProvider>
    </>
  );
}

export default App;
