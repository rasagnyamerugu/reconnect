import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold">ReConnect</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button onClick={handleLogout} className="bg-white text-indigo-600 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-white text-indigo-600 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}