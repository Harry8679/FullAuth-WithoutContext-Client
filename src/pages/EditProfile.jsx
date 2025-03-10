import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("Vous devez être connecté !");
        return;
      }
      try {
        const response = await fetch("http://localhost:6540/api/v1/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setFormData({ name: data.name, email: data.email });
      } catch (err) {
        toast.error("Erreur de chargement du profil");
      }
    };
    fetchProfile();
  }, [token]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error("Vous devez être connecté !");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:6540/api/v1/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      toast.success("Profil mis à jour avec succès !");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center">Modifier Profil</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mt-2" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mt-2" required />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Modifier</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;