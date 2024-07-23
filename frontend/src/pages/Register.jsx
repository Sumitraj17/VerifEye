import React, { useState } from "react";
import axios from "axios";
import { FaSkull } from "react-icons/fa6";
import icon from "../assets/Icon.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          fname,
          lname,
          email,
          password,
        }
      );
      setSuccess(response.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 500);
    } catch (err) {
      setError(err.response.data.message);
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex w-3/5 bg-white shadow-lg h-1/3 border border-white  rounded-xl">
        <div className="w-2/3 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-black">Register</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <form onSubmit={handleRegister} className="space-y-6 text-black">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="fname">
                  First Name
                </label>
                <input
                  className="w-3/4 px-3 py-2 border rounded bg-gray-300 shadow-xl transform transition-transform duration-300 hover:scale-110"
                  id="fname"
                  type="text"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="lname">
                  Last Name
                </label>
                <input
                  className="w-3/4 px-3 py-2 border rounded bg-gray-300 shadow-xl transform transition-transform duration-300 hover:scale-110"
                  id="lname"
                  type="text"
                  placeholder="Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-3/4 px-3 py-2 border rounded bg-gray-300 shadow-xl transform transition-transform duration-300 hover:scale-110"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm font-bold mb-2"
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
                />
              </div>
              <div className="flex items-center justify-center mt-8">
                <button
                  className="bg-black text-white font-bold py-2 px-6 rounded-full transform transition-transform duration-300 hover:scale-110"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/3 bg-black flex justify-center items-center">
          {/* <FaSkull /> */}
          <img src={icon} className="text-white w-50 h-50" />
        </div>
      </div>
    </div>
  );
};

export default Register;
