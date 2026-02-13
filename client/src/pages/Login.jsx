import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5002/api/v1/auth/login",
        { email, password }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-lg w-96 border border-zinc-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Login
        </h2>
        <input
          className="w-full bg-zinc-800 p-3 rounded mb-4 text-white"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full bg-zinc-800 p-3 rounded mb-6 text-white"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-orange-500 py-3 rounded font-bold hover:bg-orange-600">
          Sign In
        </button>
      </form>
    </div>
  );
};
export default Login;
