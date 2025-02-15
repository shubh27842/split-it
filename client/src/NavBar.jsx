import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";

const NavBar = () => {
  const { store, addUser } = useContext(AppContext);
  const { user } = store;
  console.log(store, user);
  const login = () => {
    addUser({ name: "shubh" });
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
          <div>
            <div className="text-gray-100 text-lg  rounded-lg px-4 py-1 sm:py-2 cursor-pointer hover:text-gray-300">
              Logout
            </div>
          </div>
        ) : (
          <div>
            <button
              className="text-gray-100 text-lg  rounded-lg px-4  py-1 sm:py-2 cursor-pointer hover:text-gray-300"
              onClick={() => login()}
            >
              Login
            </button>
            <button className="bg-gray-100 px-2 py-1 rounded-lg text-gray-800 hover:bg-gray-200 cursor-pointer">
              Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
