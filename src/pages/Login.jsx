import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6540/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Stocke l'utilisateur

      console.log("✅ Token sauvegardé :", localStorage.getItem("token")); // Vérification
      console.log("✅ Utilisateur stocké :", localStorage.getItem("user")); // Vérification

      login(data.user); // ✅ Met à jour `user` dans App.js
      toast.success("Connexion réussie !");
      navigate("/profile"); // ✅ Redirige immédiatement
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center">Connexion</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;