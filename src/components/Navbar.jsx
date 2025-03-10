import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const user = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">EmarhAuth</Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile" className="text-white flex items-center space-x-2">
                <FaUserCircle size={24} />
                <span>Profil</span>
              </Link>
              <Link to="/edit-profile" className="text-white">Modifier Profil</Link>
              <Link to="/change-password" className="text-white">Modifier Mot de Passe</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">Connexion</Link>
              <Link to="/register" className="bg-white text-indigo-600 px-4 py-2 rounded-lg">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;