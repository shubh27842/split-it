import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("CREDS", email, password);
  };

  return (
    <div className="shadow-sm sm:mx-[20%] mt-0 sm:mt-10 rounded-sm p-8 bg-gray-50">
      <div className="text-3xl text-gray-800">Login</div>
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
          onClick={() => handleLogin()}
        >
          Login
        </button>
        <div>
          New User?
          <button className="underline cursor-pointer text-blue-800 hover:text-blue-400 ml-2">
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
