import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axiosInstance.put("/change-password", {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      toast.success("Mot de passe mis à jour avec succès !");
      navigate("/profile");
    } catch (error) {
      toast.error("Erreur lors du changement de mot de passe.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center">Modifier Mot de Passe</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="password"
            name="oldPassword"
            placeholder="Ancien mot de passe"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Nouveau mot de passe"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirmer le nouveau mot de passe"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;