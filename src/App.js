import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import VerifyEmail from "./pages/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/verify-email/:token" element={<VerifyEmail />} />

          {!user ? (
            <>
              <Route path="/register" element={<Register login={login} />} />
              <Route path="/login" element={<Login login={login} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/profile" element={<Profile user={user} logout={logout} />} />
              <Route path="/update-profile" element={<EditProfile user={user} />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="*" element={<Navigate to="/profile" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;