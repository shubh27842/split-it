import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { useNavigate } from "react-router";

const NavBar = () => {
  const { store, logout } = useContext(AppContext);
  const { user } = store;
  const navigate = useNavigate();
  console.log(store, user);

  const handleLogout = () => {
    localStorage.clear();
    logout();
    window.location.reload();
  };
  return (
    <div className="flex justify-between items-center h-full">
      <div className="text-gray-100">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg> */}
        <div className=" text-white text-2xl font-logo block sm:hidden">
          Split It
        </div>
      </div>
      <div className="sm:mr-10 mr-0">
        {user ? (
          <div className="flex items-baseline">
            <div className="text-gray-100 mr-5 sm:mr-10 text-sm sm:text-lg">
              Welcome, {user?.name}
            </div>
            <div
              onClick={() => handleLogout()}
              className="bg-gray-100 text-sm sm:text-lg rounded-lg px-4 py-1 sm:py-2 cursor-pointer hover:bg-gray-200"
            >
              Logout
            </div>
          </div>
        ) : (
          <div>
            <button
              className="text-gray-100 text-lg rounded-lg px-4  py-1 sm:py-2 cursor-pointer hover:text-gray-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-gray-100 px-2 py-1 rounded-lg text-gray-800 hover:bg-gray-200 cursor-pointer"
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
