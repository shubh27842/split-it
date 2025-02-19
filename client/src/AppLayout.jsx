import React, { useContext, useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { AppContext } from "./context/AppContext";
import { Outlet, useNavigate } from "react-router";

const AppLayout = () => {
  const { store, login } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    console.log(authUser);
    if (store.user || authUser) {
      if (!store.user && authUser) login(JSON.parse(authUser));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [store.user]);
  console.log("STORE", store);
  return (
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
  );
};

export default AppLayout;
