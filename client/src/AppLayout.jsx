import React from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { AppContextProvider } from "./context/AppContext";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <AppContextProvider>
      <div className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-2 h-fit sm:h-screen w-full bg-gray-800 fixed bottom-0 sm:relative">
          <SideBar />
        </div>
        <div className="col-span-12 sm:col-span-10 h-screen flex flex-col">
          <div className="w-full h-1/10 bg-gray-800 p-2">
            <NavBar />
          </div>
          <div className="w-full h-9/10 max-h-9/10 bg-gray-800 p-2">
            <div className="w-full h-full max-h-full overflow-y-auto scrollbar bg-white rounded-xl ">
              <div className="p-5">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContextProvider>
  );
};

export default AppLayout;
