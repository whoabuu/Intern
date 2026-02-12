import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", {
        username,
        email,
        password,
      });
      toast.success("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-8 rounded-lg w-96 border border-zinc-800 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
          Register
        </h2>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Username</label>
          <input
            className="w-full bg-zinc-800 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="text"
            placeholder="JohnDoe"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Email</label>
          <input
            className="w-full bg-zinc-800 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="email"
            placeholder="john@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-1">Password</label>
          <input
            className="w-full bg-zinc-800 p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-orange-500 py-3 rounded font-bold hover:bg-orange-600 transition-colors">
          Create Account
        </button>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
