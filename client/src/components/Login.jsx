import React, { useContext, useState } from "react";
import { apiEndPoint } from "../utils/api";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { store, login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("CREDS", email, password);
    try {
      const res = await axios.post(`${apiEndPoint}/auth/login`, {
        email,
        password,
      });
      console.log(res);
      if (res.data.success) {
        login(res.data.user);
        localStorage.setItem("authToken", res?.data?.token);
        localStorage.setItem("authUser", JSON.stringify(res?.data?.user));
        navigate("/");
        setErrorMsg("");
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${res?.data?.token}`;
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err.response.data.message);
    }
  };

  return (
    <div className="shadow-sm sm:mx-[20%] mt-0 sm:mt-10 rounded-sm p-8 bg-gray-50">
      <div className="text-3xl text-gray-800">Login</div>
      <form onSubmit={handleLogin} className="mt-4">
        <div className="my-4 flex flex-col">
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
        <div className="pb-4  flex flex-col">
          <label htmlFor="input-password" className="text-lg text-gray-800">
            Password
          </label>
          <input
            type="password"
            id="input-password"
            className="border border-gray-400 rounded-sm indent-2 py-2 focus-visible:outline-gray-400 bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setErrorMsg("")}
          />
          {/* <div className="text-xs text-red-700">{errorMsg}</div> */}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-baseline">
          <button
            type="submit"
            className="py-1 px-4 bg-gray-800 text-gray-200 text-lg rounded-sm hover:bg-gray-900 cursor-pointer"
          >
            Login
          </button>
          <div>
            New User?
            <button
              onClick={() => navigate("/register")}
              className="underline cursor-pointer text-blue-800 hover:text-blue-400 ml-2"
            >
              Register here
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
