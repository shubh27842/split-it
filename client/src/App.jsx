import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AppContextProvider } from "./context/AppContext";
import CreateGroup from "./components/CreateGroup";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
            <Route path="creategroup" element={<CreateGroup />} />
          </Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
