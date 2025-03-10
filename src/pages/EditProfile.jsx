import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/profile")
      .then((res) => setUser(res.data))
      .catch(() => {
        toast.error("Session expirée, veuillez vous reconnecter !");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.put("/profile", user);
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