import React from "react";

const NavBar = () => {
  const loggedIn = true;
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
        <div className=" text-white text-xl font-logo block sm:hidden">
          Split It
        </div>
      </div>
      <div className="mr-10">
        {!loggedIn ? (
          <button className="text-gray-100 text-lg  rounded-lg px-4  py-1 sm:py-2 cursor-pointer hover:text-gray-300">
            Login
          </button>
        ) : (
          <div className="text-gray-100 text-lg  rounded-lg px-4 py-1 sm:py-2 cursor-pointer hover:text-gray-300">
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
