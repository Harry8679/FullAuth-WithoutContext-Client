import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  
  // ✅ Vérifier si le token est disponible
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Vous devez être connecté !");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:6540/api/v1/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Session expirée, veuillez vous reconnecter !");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          toast.error("Erreur de chargement du profil.");
        }
      }
    };

    fetchProfile();
  }, [navigate, token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      toast.error("Vous devez être connecté !");
      setLoading(false);
      return;
    }

    try {
      await axios.put("http://localhost:6540/api/v1/auth/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profil mis à jour avec succès !");
      navigate("/profile");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center">Modifier le Profil</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Mise à jour..." : "Modifier"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;