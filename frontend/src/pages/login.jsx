import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/context.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, update, setLogin, updateLogin } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Show loading toast and capture its ID
    const toastId = toast.info("Loading...", {
      autoClose: false, // Prevent auto-close during loading
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { email, password }
      );

      // Update toast to show success message
      toast.update(toastId, {
        render: "Success!",
        type: "success",
        autoClose: 2000,
      });

      updateLogin(false);
      update(true); // Update login status
      setTimeout(() => navigate("/main"), 2000); // Redirect after 2 seconds
    } catch (err) {
      // Update toast to show error message
      toast.update(toastId, {
        render:
          err.response?.data?.message || "An error occurred. Please try again.",
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-2/3 bg-white shadow-lg h-2/4 border border-white rounded-xl">
        <div className="w-3/4 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-black">Login</h2>
            <form onSubmit={handleLogin} className="space-y-6 text-black">
              <div className="mb-4">
                <label
                  className="block text-lg font-bold mb-2 text-black"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-3/4 px-3 py-2 border rounded bg-gray-300 shadow-xl transform transition-transform duration-300 hover:scale-110"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-lg font-bold mb-2 text-black"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-3/4 px-3 py-2 border rounded bg-gray-300 shadow-xl transform transition-transform duration-300 hover:scale-110"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-center mt-8">
                <button
                  className="bg-black text-white font-bold py-2 px-6 rounded-full transform transition-transform duration-300 hover:scale-110"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/3 bg-black flex justify-center items-center">
          <MdOutlineLogin className="text-white w-40 h-40" />
        </div>
      </div>
    </div>
  );
};

export default Login;
