import { useNavigate } from "react-router-dom";

const Profile = ({ user, logout }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Mon Profil</h2>
        <p className="text-lg mt-2"><strong>Nom:</strong> {user.name}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Profile;