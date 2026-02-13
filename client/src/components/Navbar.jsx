import { Link, useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center z-50">
      <Link
        to="/"
        className="text-xl font-bold text-orange-500 flex items-center gap-2"
      >
        <Car /> Service
      </Link>
      <div className="flex gap-4">
        {!token ? (
          <>
            <Link to="/login" className="hover:text-orange-500">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-orange-500">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-400"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
