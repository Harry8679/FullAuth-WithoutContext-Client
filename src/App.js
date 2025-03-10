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
    const storedToken = localStorage.getItem("token");

    console.log("🔍 Vérification App.js - Token :", storedToken);
    console.log("🔍 Vérification App.js - User :", storedUser);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    if (!userData.token) {
      console.error("❌ ERREUR : Token manquant !");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    
    // ✅ Redirection immédiate après déconnexion
    window.location.href = "/login";
  };  

  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {!user ? (
            <>
              <Route path="/register" element={<Register login={login} />} />
              <Route path="/login" element={<Login login={login} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/profile" element={<Profile user={user} logout={logout} />} />
              <Route path="/edit-profile" element={<EditProfile user={user} />} />
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