import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:6540/api/v1/auth/verify-email/${token}`, {
          method: "GET",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        toast.success("Email vérifié avec succès !");
        navigate("/login");
      } catch (error) {
        toast.error("Échec de la vérification de l'email.");
        navigate("/register");
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Vérification en cours...</h2>
        <p className="text-gray-600 text-center">Merci de patienter.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;