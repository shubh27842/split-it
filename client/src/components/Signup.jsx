import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { apiEndPoint } from "../utils/api";
import { login } from "../../../server/controllers/authController";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${apiEndPoint}/auth/register`, {
        name,
        email,
        password,
        mobile: Math.random(),
      });
      console.log(res);

      if (res.status === 200) {
        login(res.data.user);
        localStorage.setItem("authToken", res?.data?.token);
        localStorage.setItem("authUser", JSON.stringify(res?.data?.user));
        navigate("/");
        toast.success("Registration successful");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shadow-sm sm:mx-[20%] mt-0 sm:mt-10 rounded-sm p-8 bg-gray-50">
      <div className="text-3xl mb-4 text-gray-800">Register</div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="input-name" className="text-lg text-gray-800">
          Name
        </label>
        <input
          type="name"
          id="input-name"
          className="border border-gray-400 rounded-sm indent-2 py-2 focus-visible:outline-gray-400 bg-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="input-email" className="text-lg text-gray-800">
          Email
        </label>
        <input
          type="email"
          id="input-email"
          className="border border-gray-400 rounded-sm indent-2 py-2 focus-visible:outline-gray-400 bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="input-password" className="text-lg text-gray-800">
          Password
        </label>
        <input
          type="password"
          id="input-password"
          className="border border-gray-400 rounded-sm indent-2 py-2 focus-visible:outline-gray-400 bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-baseline">
        <button
          className="py-1 px-4 bg-gray-800 text-gray-200 text-lg rounded-sm hover:bg-gray-900 cursor-pointer"
          onClick={() => handleSignup()}
        >
          Register
        </button>
        <div>
          Already registered?
          <button
            onClick={() => navigate("/login")}
            className="underline cursor-pointer text-blue-800 hover:text-blue-400 ml-2"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
