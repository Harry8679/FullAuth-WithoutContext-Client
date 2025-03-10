import axios from "axios";

// Récupération du token depuis localStorage
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:6540/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// Rafraîchir automatiquement le token si nécessaire
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Suppression du token invalide
      window.location.href = "/login"; // Redirection vers la connexion
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;